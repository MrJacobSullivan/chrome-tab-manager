const COMMANDS = {
  CLOSE_TABS_ALL_EXCEPT: 'close-tabs-all-except',
  CLOSE_TABS_ALL_INCLUDING: 'close-tabs-all-including',
  CLOSE_TABS_RIGHT: 'close-tabs-right',
  CLOSE_TABS_LEFT: 'close-tabs-left',
};

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.getAllInWindow(null, (tabs) => {
    const currentTabIndex = tabs.find((tab) => tab.active).index;

    const removeTab = (tab) => chrome.tabs.remove(tab.id);

    switch (command) {
      case COMMANDS.CLOSE_TABS_ALL_EXCEPT:
        tabs.forEach((tab) => tab.index != currentTabIndex && removeTab(tab));
        break;

      case COMMANDS.CLOSE_TABS_ALL_INCLUDING:
        tabs.forEach((tab) => removeTab(tab));
        break;

      case COMMANDS.CLOSE_TABS_RIGHT:
        tabs.forEach((tab) => tab.index > currentTabIndex && removeTab(tab));
        break;

      case COMMANDS.CLOSE_TABS_LEFT:
        tabs.forEach((tab) => tab.index < currentTabIndex && removeTab(tab));
        break;
    }
  });
});
