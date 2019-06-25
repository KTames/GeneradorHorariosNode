function zfill(s, len) {
    let o = s.toString();
    while (o.length < len)
        o = "0" + o;
    return o;
}