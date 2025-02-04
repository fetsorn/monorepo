const { PluginModule } = require("@polywrap/core-js");

const mockPlugin = () => {

  class MockPlugin extends PluginModule {
    getData() { return this.config.val; }

    setData(input) {
      this.config.val = +input.options.value;
      return { txReceipt: "0xdone", value: this.config.val };
    }

    deployContract() { return "0x100"; }
  }

  return {
    factory: () => new MockPlugin({ val: 0 }),
    manifest: {
      schema: ``,
      implements: [],
    },
  };
};

async function getClientConfig(defaultConfigs) {
  if (defaultConfigs.plugins) {
    defaultConfigs.plugins.push({
      uri: "wrap://ens/mock.eth",
      plugin: mockPlugin(),
    });
  } else {
    defaultConfigs.plugins = [
      {
        uri: "wrap://ens/mock.eth",
        plugin: mockPlugin(),
      },
    ];
  }
  defaultConfigs.redirects = [
    {
      from: "wrap://ens/testnet/simplestorage.eth",
      to: "wrap://ens/mock.eth",
    },
  ];
  return defaultConfigs;
}

module.exports = {
  getClientConfig,
};
