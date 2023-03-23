import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', () => {
  const sidebarWidthOpen = ref('300px');
  const sidebarWidthClosed = ref('80px');
  const sidebarWidth = computed(() => {
    if (isSmallScreen.value) return '100%';
    return isSidebarCollapsed.value
      ? sidebarWidthClosed.value
      : sidebarWidthOpen.value;
  });
  const headerHeight = ref(150);

  const isSidebarOpen = ref(true);
  const isSidebarCollapsed = computed(() => {
    if (isSmallScreen.value) return false;
    return !isSidebarOpen.value;
  });
  const isSmallScreen = ref(false);
  const isMediumScreen = ref(false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  const handleResize = () => {
    isSmallScreen.value = window.innerWidth <= 768;
    isMediumScreen.value = window.innerWidth <= 1350;
  };

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  watch(isMediumScreen, (isMediumScreen) => {
    isSidebarOpen.value = !isMediumScreen;
  });

  return {
    sidebarWidth,
    headerHeight,
    isSidebarOpen,
    isSmallScreen,
    isSidebarCollapsed,
    toggleSidebar,
  };
});
