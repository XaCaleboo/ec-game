const fetchData = async (values) => {
    const url = '/login/';
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'text/html,application/xhtml',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        },
        body: 'username=user_0&password=user_0_password'
    });
    const content = await response.json();
    if (!content.exception)
        return content;
    return {};
};

export { fetchData };