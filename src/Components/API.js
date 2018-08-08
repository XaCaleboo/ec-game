const fetchData = async (values) => {
    const url = 'https://zzaakiirr.pythonanywhere.com/login/';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(values)
    });
    const content = await response.json();
    if (!content.exception)
        return content;
    return {};
};

export { fetchData };