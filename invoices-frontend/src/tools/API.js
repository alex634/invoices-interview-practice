class API {
    constructor(hostname, port) {
        this.url = `http://${hostname}:${port}`;
    }

    async addInvoice(reason, amount, to, from) {
        const validTypes = (typeof reason === "string" &&
            typeof amount === "number" &&
            typeof to === "string" &&
            typeof from === "string"
        );

        const validData = (reason.length + to.length + from.length > 0) && amount >= 0.0;

        if (!validTypes) {
            throw new Error("Frontend: Type of one of the fields is incorrect");
        }

        if (!validData) {
            throw new Error("Frontend: String field is empty or amount is less than 0");
        }

        const fetchData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reason, amount, to, from})
        }

        const response = await fetch(`${this.url}/add`,
            fetchData
        );

        const text = await response.text();

        return text
    }

    async getInvoices() {
        const response = await fetch(`${this.url}/invoices`);
        const json = await response.json()
        return json.invoices;
    }

    async deleteInvoice(id) {
        const fetchData = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        };

        const response = await fetch(`${this.url}/delete`,
            fetchData
        );

        const text = await response.text();

        return text;
    }
}

export default API;