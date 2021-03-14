const now = () => {
    return new Date();
}

const DateUtil = {
    async getDayOfWeek() {
        return now().toString().substring(0, 3).toUpperCase();
    },
    async getDayTime() {
        const hour = now().getHours();

        if (hour > 0 && hour <= 12)
            return 'MORNING';

        if (hour > 12 && hour <= 17)
            return 'AFTERNOON';

        return 'NIGHT';
    }
};

module.exports = DateUtil;
