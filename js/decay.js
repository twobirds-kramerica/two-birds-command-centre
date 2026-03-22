/**
 * Trust Decay Calculator
 * Compares review-by date to today and returns trust level + label
 */
const Decay = {
  /**
   * Returns { level: 'green'|'yellow'|'red'|'permanent', label, daysUntil }
   */
  assess(reviewBy) {
    if (!reviewBy || reviewBy === 'never') {
      return { level: 'permanent', label: '🔵 Permanent', daysUntil: null };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const review = new Date(reviewBy);
    review.setHours(0, 0, 0, 0);
    const msPerDay = 86400000;
    const daysUntil = Math.round((review - today) / msPerDay);

    if (daysUntil < 0) {
      return {
        level: 'red',
        label: `🔴 Overdue (${Math.abs(daysUntil)}d ago)`,
        daysUntil
      };
    } else if (daysUntil <= 30) {
      return {
        level: 'yellow',
        label: `🟡 Review in ${daysUntil}d`,
        daysUntil
      };
    } else {
      return {
        level: 'green',
        label: `🟢 Current (due ${reviewBy})`,
        daysUntil
      };
    }
  },

  /**
   * Returns a badge HTML string
   */
  badge(reviewBy) {
    const { level, label } = this.assess(reviewBy);
    return `<span class="badge trust-${level}">${label}</span>`;
  }
};
