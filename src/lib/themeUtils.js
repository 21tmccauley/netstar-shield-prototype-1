/**
 * Theme and styling utility functions
 */

/**
 * Gets color classes based on security status for use in indicators
 * @param {string} status - Status: "excellent", "good", "moderate", or "poor"
 * @returns {object} Object with bg, text, and gradient color classes
 */
export function getColorClasses(status) {
  switch (status) {
    case "excellent":
      return {
        bg: "bg-lime-300 dark:bg-lime-500",
        text: "text-black dark:text-black",
        gradient: "from-lime-500 to-green-500"
      }
    case "good":
      return {
        bg: "bg-blue-300 dark:bg-blue-500",
        text: "text-black dark:text-black",
        gradient: "from-blue-500 to-cyan-500"
      }
    case "moderate":
      return {
        bg: "bg-orange-300 dark:bg-orange-500",
        text: "text-black dark:text-black",
        gradient: "from-orange-500 to-red-500"
      }
    case "poor":
      return {
        bg: "bg-red-300 dark:bg-red-500",
        text: "text-black dark:text-black",
        gradient: "from-red-500 to-pink-500"
      }
    default:
      return {
        bg: "bg-gray-300 dark:bg-gray-500",
        text: "text-black dark:text-black",
        gradient: "from-gray-500 to-slate-500"
      }
  }
}

/**
 * Gets comprehensive status styling info for detail cards
 * @param {string} status - Status: "excellent", "good", "moderate", or "poor"
 * @param {string} mode - Theme mode: "light" or "dark"
 * @returns {object} Object with various styling classes and message
 */
export function getStatusInfo(status) {
  switch (status) {
    case "excellent":
      return {
        bgGradient: "from-lime-500 to-green-500 dark:from-lime-500 dark:to-green-500",
        iconBg: "bg-lime-200 dark:bg-lime-600",
        iconColor: "text-lime-800 dark:text-lime-100",
        textColor: "text-lime-800 dark:text-lime-200",
        scoreColor: "text-black dark:text-black",
        badgeBg: "bg-lime-500",
        message: "Everything looks perfect!"
      }
    case "good":
      return {
        bgGradient: "from-blue-500 to-cyan-500 dark:from-blue-500 dark:to-cyan-500",
        iconBg: "bg-blue-200 dark:bg-blue-600",
        iconColor: "text-blue-800 dark:text-blue-100",
        textColor: "text-blue-800 dark:text-blue-200",
        scoreColor: "text-black dark:text-black",
        badgeBg: "bg-blue-500",
        message: "Looking good!"
      }
    case "moderate":
      return {
        bgGradient: "from-orange-500 to-red-500 dark:from-orange-500 dark:to-red-500",
        iconBg: "bg-orange-200 dark:bg-orange-600",
        iconColor: "text-orange-800 dark:text-orange-100",
        textColor: "text-orange-800 dark:text-orange-200",
        scoreColor: "text-black dark:text-black",
        badgeBg: "bg-orange-500",
        message: "Could be improved"
      }
    case "poor":
      return {
        bgGradient: "from-red-500 to-pink-500 dark:from-red-500 dark:to-pink-500",
        iconBg: "bg-red-200 dark:bg-red-600",
        iconColor: "text-red-800 dark:text-red-100",
        textColor: "text-red-800 dark:text-red-200",
        scoreColor: "text-black dark:text-black",
        badgeBg: "bg-red-500",
        message: "Needs attention"
      }
    default:
      return {
        bgGradient: "from-gray-500 to-slate-500 dark:from-gray-500 dark:to-slate-500",
        iconBg: "bg-gray-200 dark:bg-gray-600",
        iconColor: "text-gray-800 dark:text-gray-100",
        textColor: "text-gray-800 dark:text-gray-200",
        scoreColor: "text-black dark:text-black",
        badgeBg: "bg-gray-500",
        message: "Unknown status"
      }
  }
}

