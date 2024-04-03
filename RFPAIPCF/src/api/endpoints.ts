export const GetResults = async (
    reqTextJs: any
): Promise<any> => {
    try {
        console.log(reqTextJs)
        const response = await fetch("https://pdfscan.azurewebsites.net/api/AzureOpenAiFindingTheMatchingRecordInDataset?code=5vkvV6Uedfkt58nuwAMjRltZJgbtlyRq4AqPvDTHkSEiAzFuDZJ8Vg==", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqTextJs)
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        console.log("result",response);

        const responseData = await response.json();
        console.log("res2",responseData);
        return responseData;
    } catch(error) {
        console.error("Error getting response", error);
        throw error;
    }
}