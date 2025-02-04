import { filesystemPlugin } from "../index";
import {
  buildWrapper,
  ensAddresses,
  initTestEnvironment,
  stopTestEnvironment,
  providers
} from "@polywrap/test-env-js";
import {
  PolywrapClient,
  PolywrapClientConfig,
  defaultIpfsProviders,
} from "@polywrap/client-js";
import { GetPathToTestWrappers } from "@polywrap/test-cases";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";
import { ensPlugin } from "@polywrap/ens-plugin-js";
import { ethereumPlugin } from "@polywrap/ethereum-plugin-js";
import fs from "fs";
import path from "path";

jest.setTimeout(360000);

describe("Filesystem plugin", () => {
  let client: PolywrapClient;

  beforeAll(async () => {
    await initTestEnvironment();

    const config: Partial<PolywrapClientConfig> = {
      plugins: [
        {
          uri: "wrap://ens/fs.polywrap.eth",
          plugin: filesystemPlugin({ }),
        },
        // IPFS is required for downloading Polywrap packages
        {
          uri: "wrap://ens/ipfs.polywrap.eth",
          plugin: ipfsPlugin({
            provider: providers.ipfs,
            fallbackProviders: defaultIpfsProviders,
          }),
        },
        // ENS is required for resolving domain to IPFS hashes
        {
          uri: "wrap://ens/ens.polywrap.eth",
          plugin: ensPlugin({
            addresses: {
              testnet: ensAddresses.ensAddress,
            },
          }),
        },
        {
          uri: "wrap://ens/ethereum.polywrap.eth",
          plugin: ethereumPlugin({
            networks: {
              testnet: {
                provider: providers.ethereum,
              },
            },
            defaultNetwork: "testnet",
          }),
        },
      ],
    };
    client = new PolywrapClient(config);
  });

  afterAll(async () => {
    await stopTestEnvironment();
  });

  it("invokes simple-storage wrapper on local drive", async () => {
    const wrapperPath = path.resolve(
      `${GetPathToTestWrappers()}/wasm-as/simple-storage`
    );
    await buildWrapper(wrapperPath);

    const fsPath = `${wrapperPath}/build`;
    const fsUri = `fs/${fsPath}`;

    // query wrapper from filesystem
    const deploy = await client.query<{
      deployContract: string;
    }>({
      uri: fsUri,
      query: `
        mutation {
          deployContract(
            connection: {
              networkNameOrChainId: "testnet"
            }
          )
        }
      `,
    });

    expect(deploy.errors).toBeFalsy();
    expect(deploy.data).toBeTruthy();
    expect(deploy.data?.deployContract.indexOf("0x")).toBeGreaterThan(-1);

    // get the schema
    const schema = await client.getSchema(fsUri);
    const expectedSchema = await fs.promises.readFile(`${fsPath}/schema.graphql`, "utf-8");

    expect(schema).toBe(expectedSchema);

    // get the manifest
    const manifest = await client.getManifest(fsUri, { type: "polywrap" });

    expect(manifest).toBeTruthy();
    expect(manifest.language).toBe("wasm/assemblyscript");

    // get a file
    const file = await client.getFile(fsUri, { path: "polywrap.json", encoding: "utf-8" });
    const expectedFile = await fs.promises.readFile(`${fsPath}/polywrap.json`, "utf-8");

    expect(file).toBe(expectedFile);
  });
});
