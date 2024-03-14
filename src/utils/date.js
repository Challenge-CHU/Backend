export const getDatesArray = function (s, e) {
    for (
        var a = [], d = new Date(s);
        d <= new Date(e);
        d.setDate(d.getDate() + 1)
    ) {
        a.push(d.toISOString().split("T")[0]);
    }
    return a;
};
