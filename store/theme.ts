import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', () => {
  const isSummaryOpen = ref(true);
  const isSidebarOpen = ref(true);
  const isSidebarCollapsed = computed(() => {
    // if (isSmallScreen.value) return false;
    return !isSidebarOpen.value;
  });
  const isSmallScreen = ref(false);
  const isMediumScreen = ref(false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  const closeSummary = () => (isSummaryOpen.value = false);
  const openSummary = () => (isSummaryOpen.value = true);
  const toggleSummary = () => {
    isSummaryOpen.value = !isSummaryOpen.value;
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
    if (isMediumScreen) {
      closeSummary();
    }
  });

  return {
    isSidebarOpen,
    isSidebarCollapsed,
    isSmallScreen,
    isSummaryOpen,
    closeSummary,
    openSummary,
    toggleSidebar,
    toggleSummary,
  };
});
