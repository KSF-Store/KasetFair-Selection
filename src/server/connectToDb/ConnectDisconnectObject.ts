type ConnectDisconnectParams = {
    fieldName: string;
    validItems: (number | string)[];
    currentItems: (number | string)[];
    connectField: string;
    disconnectField: string;
};

export function createConnectDisconnectObject({
    fieldName,
    validItems,
    currentItems,
    connectField,
    disconnectField,
}: ConnectDisconnectParams): Object {
    const itemsToConnect = validItems.filter((id) =>
        typeof id === "number"
            ? !currentItems.includes(id)
            : !currentItems.find((origin) => origin === id)
    );
    const itemsToDisconnect = currentItems.filter((id) =>
        typeof id === "number"
            ? !validItems.includes(id)
            : !validItems.find((origin) => origin === id)
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
