const COMMANDS = {
  CLOSE_TABS_ALL_EXCEPT: 'CLOSE_TABS_ALL_EXCEPT',
  CLOSE_TABS_ALL_INCLUDING: 'CLOSE_TABS_ALL_INCLUDING',
  CLOSE_TABS_RIGHT: 'CLOSE_TABS_RIGHT',
  CLOSE_TABS_LEFT: 'CLOSE_TABS_LEFT',
};

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.getAllInWindow(null, (tabs) => {
    const currentTabIndex = tabs.find((tab) => tab.active);

    const removeTab = (tab) => chrome.tabs.remove(tab.id);

    switch (command) {
      case COMMANDS.CLOSE_TABS_ALL_EXCEPT:
        tabs.forEach((tab) => tab.index != currentTabIndex && removeTab(tab));

      case COMMANDS.CLOSE_TABS_ALL_INCLUDING:
        tabs.forEach((tab) => removeTab(tab));

      case COMMANDS.CLOSE_TABS_RIGHT:
        tabs.forEach((tab) => tab.index > currentTabIndex && removeTab(tab));

      case COMMANDS.CLOSE_TABS_LEFT:
        tabs.forEach((tab) => tab.index < currentTabIndex && removeTab(tab));
    }
  });
});
