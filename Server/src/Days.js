module.exports = function() {
    const Days = {};
    Days.daysOfTheWeek = [
        {
            'd': 'L',
            'day': 'Lunes'
        },
        {
            'd': 'K',
            'day': 'Martes'
        },
        {
            'd': 'M',
            'day': 'Miércoles'
        },
        {
            'd': 'J',
            'day': 'Jueves'
        },
        {
            'd': 'V',
            'day': 'Viernes'
        },
        {
            'd': 'S',
            'day': 'Sábado'
        },
        {
            'd': 'D',
            'day': 'Domingo'
        }
    ];

    Days.isLower = function(d1, d2) {
        if (d1 === d2) return false;
        const days = Days.daysOfTheWeek;
        for (let i = 0; i < days.length; i++) {
            if (d1 === days[i]['d']) return true;
            if (d2 === days[i]['d']) return false;
        }
        return false;
    };

    Days.isLowerLong = function(d1, d2) {
        if (d1 === d2) return false;
        const days = Days.daysOfTheWeek;
        for (let i = 0; i < days.length; i++) {
            if (d1 === days[i]['day']) return true;
            if (d2 === days[i]['day']) return false;
        }
        return false;
    };

    return Days;
};