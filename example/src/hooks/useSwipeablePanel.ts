import * as React from 'react';

const useSwipeablePanel = () => {
  const [panelState, setPanelState] = React.useState({
    isActive: false,
    openLarge: false,
    onlyLarge: false,
    fullWidth: false,
    noBackgroundOpacity: false,
    bounceAnimation: false,
    closeOnTouchOutside: false,
    noBar: false,
    showCloseButton: false,
    onlySmall: false,
    allowTouchOutside: false,
    barStyle: {},
    panelStyles: {},
    contentType: null,
  });

  const changePanelState = React.useCallback(
    function (props) {
      setPanelState({
        ...panelState,
        ...props,
      });
    },
    [panelState],
  );

  function openAboutPanel() {
    changePanelState({
      isActive: true,
      openLarge: true,
      fullWidth: true,
      showCloseButton: true,
      panelStyles: {},
      contentType: 'about',
    });
  }

  function openSettingsPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
      fullWidth: true,
      showCloseButton: true,
      panelStyles: {},
      contentType: 'settings',
    });
  }

  function openConfigurationsPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
      fullWidth: false,
      showCloseButton: false,
      noBar: false,
      panelStyles: {},
      contentType: 'configurations',
    });
  }

  function openDarkPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
      fullWidth: true,
      showCloseButton: true,
      noBar: false,
      panelStyles: {
        style: { backgroundColor: '#1f1f1f' },
        barStyle: { backgroundColor: 'rgba(255,255,255,0.2)' },
        closeRootStyle: { backgroundColor: 'rgba(255,255,255,0.2)' },
      },
      contentType: 'darkShoppingCart',
    });
  }

  function openDefaultPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
    });
  }

  function closePanel() {
    changePanelState({
      isActive: false,
    });
  }

  return {
    panelState,
    changePanelState,
    openAboutPanel,
    openSettingsPanel,
    openConfigurationsPanel,
    openDarkPanel,
    openDefaultPanel,
    closePanel,
  };
};

export default useSwipeablePanel;
