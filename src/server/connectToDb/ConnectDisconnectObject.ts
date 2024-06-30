type ConnectDisconnectParams = {
    fieldName: string;
    validItems: number[] | string[];
    currentItems: number[] | string[];
    connectField: string;
    disconnectField: string;
};

export function createConnectDisconnectObject({
    fieldName,
    validItems,
    currentItems,
    connectField,
    disconnectField,
}: ConnectDisconnectParams) {
    const itemsToConnect = validItems.filter(
        (id) => !currentItems.includes(id)
    );
    const itemsToDisconnect = currentItems.filter(
        (id) => !validItems.includes(id)
    );
    return {
        [fieldName]: {
            connect:
                itemsToConnect.length > 0
                    ? itemsToConnect.map((id) => ({ [connectField]: id }))
                    : undefined,
            disconnect:
                itemsToDisconnect.length > 0
                    ? itemsToDisconnect.map((id) => ({ [disconnectField]: id }))
                    : undefined,
        },
    };
}
