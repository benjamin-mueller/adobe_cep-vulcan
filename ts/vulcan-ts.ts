/**
 *  Typescript implementation of Vulcan - v8.0.0
 *
 *  Custom Vulcan.js implementation in Typescript.
 *  The implementation covers version 8.x from original repository, with all functionalities.
 *  All documentation comments were also based on original.
 *
 *
 *  For more information about Creative Cloud extensions development
 *  please refer to original Github page: https://github.com/Adobe-CEP/CEP-Resources
 */

declare var cep: any;

/** Vulcan - v8.0.0 */
/**
 * @class Vulcan
 *
 * The singleton instance, <tt>VulcanInterface</tt>, provides an interface
 * to the Vulcan. Allows you to launch CC applications
 * and discover information about them.
 */
export namespace Vulcan {

    /**
     * Gets all available application specifiers on the local machine.
     *
     * @return The array of all available application specifiers.
     */
    export function getTargetSpecifiers(): any {
        var params = {};
        return JSON.parse((<any>window).__adobe_cep__.invokeSync("vulcanGetTargetSpecifiers", JSON.stringify(params)));
    };

    /**
     * Launches a CC application on the local machine, if it is not already running.
     *
     * @param targetSpecifier The application specifier; for example "indesign".
     *
     *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
     *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
     *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
     *        receive wrong result.
     *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
     *
     *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
     * @param focus           True to launch in foreground, or false to launch in the background.
     * @param cmdLine         Optional, command-line parameters to supply to the launch command.
     * @return True if the app can be launched, false otherwise.
     */
    export function launchApp(targetSpecifier: string, focus: boolean, cmdLine: string): boolean {
        if (!requiredParamsValid(targetSpecifier)) {
            return false;
        }
        var params: {
            targetSpecifier: string,
            focus: boolean,
            cmdLine: string
        } =
            {
                targetSpecifier: targetSpecifier,
                focus: (focus ? true : false),
                cmdLine: requiredParamsValid(cmdLine) ? cmdLine : ""
            }

        return JSON.parse((<any>window).__adobe_cep__.invokeSync("vulcanLaunchApp", JSON.stringify(params))).result;
    };

    /**
     * Checks whether a CC application is running on the local machine.
     *
     * @param targetSpecifier The application specifier; for example "indesign".
     *
     *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
     *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
     *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
     *        receive wrong result.
     *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
     *
     *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
     * @return True if the app is running, false otherwise.
     */
    export function isAppRunning(targetSpecifier: string): boolean {
        if (!requiredParamsValid(targetSpecifier)) {
            return false;
        }
        var params: any = {
            targetSpecifier: targetSpecifier
        }
        return JSON.parse((<any>window).__adobe_cep__.invokeSync("vulcanIsAppRunning", JSON.stringify(params))).result;
    };

    /**
     * Checks whether a CC application is installed on the local machine.
     *
     * @param targetSpecifier The application specifier; for example "indesign".
     *
     *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
     *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
     *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
     *        receive wrong result.
     *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
     *
     *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
     * @return True if the app is installed, false otherwise.
     */
    export function isAppInstalled(targetSpecifier: string): boolean {
        if (!requiredParamsValid(targetSpecifier)) {
            return false;
        }
        var params: any = {
            targetSpecifier: targetSpecifier
        };
        return JSON.parse((<any>window).__adobe_cep__.invokeSync("vulcanIsAppInstalled", JSON.stringify(params))).result;
    };

    /**
     * Retrieves the local install path of a CC application.
     *
     * @param targetSpecifier The application specifier; for example "indesign".
     *
     *        Note: In Windows 7 64-bit or Windows 8 64-bit system, some target applications (like Photoshop and Illustrator) have both 32-bit version
     *        and 64-bit version. Therefore, we need to specify the version by this parameter with "photoshop-70.032" or "photoshop-70.064". If you
     *        installed Photoshop 32-bit and 64-bit on one Windows 64-bit system and invoke this interface with parameter "photoshop-70.032", you may
     *        receive wrong result.
     *        The specifiers for Illustrator is "illustrator-17.032", "illustrator-17.064", "illustrator-17" and "illustrator".
     *
     *        In other platforms there is no such issue, so we can use "photoshop" or "photoshop-70" as specifier.
     * @return The path string if the application is found, "" otherwise.
     */
    export function getAppPath(targetSpecifier: string): string {
        if (!requiredParamsValid(targetSpecifier)) {
            return "";
        }
        var params: any = {targetSpecifier: targetSpecifier}
        return JSON.parse((<any>window).__adobe_cep__.invokeSync("vulcanGetAppPath", JSON.stringify(params))).result;
    };

    /**
     * Registers a message listener callback function for a Vulcan message.
     *
     * @param type            The message type.
     * @param callback        The callback function that handles the message.
     *                        Takes one argument, the message object.
     * @param obj             Optional, the object containing the callback method, if any.
     *                        Default is null.
     */
    export function addMessageListener(type: any, callback: (executionResult: any) => void, obj: any): void {
        if (!requiredParamsValid(type, callback) || !strStartsWith(type, VulcanMessage.TYPE_PREFIX)) {
            return;
        }
        var params: any = {type: type};
        (<any>window).__adobe_cep__.invokeAsync("vulcanAddMessageListener", JSON.stringify(params), callback, obj);
    };

    /**
     * Removes a registered message listener callback function for a Vulcan message.
     *
     * @param type            The message type.
     * @param callback        The callback function that was registered.
     *                        Takes one argument, the message object.
     * @param obj             Optional, the object containing the callback method, if any.
     *                        Default is null.
     */
    export function removeMessageListener(type: any, callback: (executionResult: any) => void, obj: any): void {
        if (!requiredParamsValid(type, callback) || !strStartsWith(type, VulcanMessage.TYPE_PREFIX)) {
            return;
        }
        var params: any = {type: type};
        (<any>window).__adobe_cep__.invokeAsync("vulcanRemoveMessageListener", JSON.stringify(params), callback, obj);
    };

    /**
     * Dispatches a Vulcan message.
     *
     * @param vulcanMessage   The message object.
     */
    export function dispatchMessage(vulcanMessage: any): void {
        if (!requiredParamsValid(vulcanMessage) || !strStartsWith(vulcanMessage.type, VulcanMessage.TYPE_PREFIX)) {
            return;
        }

        var message = new VulcanMessage(vulcanMessage.type);
        message.initialize(vulcanMessage);

        var params: any = {
            vulcanMessage: message
        };

        (<any>window).__adobe_cep__.invokeSync("vulcanDispatchMessage", JSON.stringify(params));
    };

    /**
     * Retrieves the message payload of a Vulcan message for the registered message listener callback function.
     *
     * @param vulcanMessage   The message object.
     * @return                A string containing the message payload.
     */
    export function getPayload(vulcanMessage: any): string {
        if (!requiredParamsValid(vulcanMessage) || !strStartsWith(vulcanMessage.type, VulcanMessage.TYPE_PREFIX)) {
            return null;
        }
        var message = new VulcanMessage(vulcanMessage.type);
        message.initialize(vulcanMessage);
        return message.getPayload();
    };

    /**
     * Gets all available endpoints of the running Vulcan-enabled applications.
     *
     * Since 7.0.0
     *
     * @return                The array of all available endpoints.
     * An example endpoint string:
     * <endPoint>
     *   <appId>PHXS</appId>
     *   <appVersion>16.1.0</appVersion>
     * </endPoint>
     */
    export function getEndPoints(): any {
        var params = {};
        return JSON.parse((<any>window).__adobe_cep__.invokeSync("vulcanGetEndPoints", JSON.stringify(params)));
    };

    /**
     * Gets the endpoint for itself.
     *
     * Since 7.0.0
     *
     * @return                The endpoint string for itself.
     */
    export function getSelfEndPoint(): string {
        var params = {};
        return (<any>window).__adobe_cep__.invokeSync("vulcanGetSelfEndPoint", JSON.stringify(params));
    };

}


//--------------------------------- Vulcan Message ------------------------------
/**
 * @class VulcanMessage
 * Message type for sending messages between host applications.
 * A message of this type can be sent to the designated destination
 * when appId and appVersion are provided and valid. Otherwise,
 * the message is broadcast to all running Vulcan-enabled applications.
 *
 * To send a message between extensions running within one
 * application, use the <code>CSEvent</code> type in CSInterface.js.
 *
 * @param type            The message type.
 * @param appId           The peer appId.
 * @param appVersion      The peer appVersion.
 *
 */
export class VulcanMessage {

    type: any;
    scope: any;
    appId: any;
    appVersion: any;
    data: any;

    static readonly TYPE_PREFIX: string = "vulcan.SuiteMessage.";
    static readonly SCOPE_SUITE: string = "GLOBAL";
    static readonly DEFAULT_APP_ID: string = "UNKNOWN";
    static readonly DEFAULT_APP_VERSION: string = "UNKNOWN";
    static readonly DEFAULT_DATA: string = "<data><payload></payload></data>";
    static readonly dataTemplate: string = "<data>{0}</data>";
    static readonly payloadTemplate: string = "<payload>{0}</payload>";

    constructor(type: string, appId?: any, appVersion?: any) {
        this.type = type;
        this.scope = VulcanMessage.SCOPE_SUITE;
        this.appId = requiredParamsValid(appId) ? appId : VulcanMessage.DEFAULT_APP_ID;
        this.appVersion = requiredParamsValid(appVersion) ? appVersion : VulcanMessage.DEFAULT_APP_VERSION;
        this.data = VulcanMessage.DEFAULT_DATA;
    }


    /**
     * Initializes this message instance.
     *
     * @param message         A \c message instance to use for initialization.
     */

    initialize(message: any): void {
        this.type = message.type;
        this.scope = message.scope;
        this.appId = message.appId;
        this.appVersion = message.appVersion;
        this.data = message.data;
    }

    /**
     * Retrieves the message data.
     *
     * @return A data string in XML format.
     */
    xmlData(): string {
        if (this.data === undefined) {
            var str = "";
            str = String.format(VulcanMessage.payloadTemplate, str);
            this.data = String.format(VulcanMessage.dataTemplate, str);
        }
        return this.data;
    };

    /**
     * Sets the message payload of this message.
     *
     * @param payload         A string containing the message payload.
     */
    setPayload(payload: string): void {
        var str = cep.encoding.convertion.utf8_to_b64(payload);
        str = String.format(VulcanMessage.payloadTemplate, str);
        this.data = String.format(VulcanMessage.dataTemplate, str);
    };

    /**
     * Retrieves the message payload of this message.
     *
     * @return                A string containing the message payload.
     */
    getPayload(): string {
        var str = GetValueByKey(this.data, "payload");
        if (str !== null) {
            return cep.encoding.convertion.b64_to_utf8(str);
        }
        return null;
    };

    /**
     * Converts the properties of this instance to a string.
     *
     * @return The string version of this instance.
     */
    toString(): string {
        var str = "type=" + this.type;
        str += ", scope=" + this.scope;
        str += ", appId=" + this.appId;
        str += ", appVersion=" + this.appVersion;
        str += ", data=" + this.xmlData();
        return str;
    };

}

//--------------------------------------- Util --------------------------------
/**
 * Formats a string based on a template.
 *
 * @param src The format template.
 *
 * @return The formatted string
 */
module String {
    export function format(...src: string[]): string {
        if (src.length === 0) {
            return null;
        }

        var args = Array.prototype.slice.call(src, 1);
        return src[0].replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }
}

/**
 * Retrieves the content of an XML element.
 *
 * @param xmlStr    The XML string.
 * @param key       The name of the tag.
 *
 * @return          The content of the tag, or the empty string
 *                  if such tag is not found or the tag has no content.
 */
export function GetValueByKey(xmlStr: string, key: any): string {
    if ((<any>window).DOMParser) {
        var parser = new (<any>window).DOMParser();
        try {
            var xmlDoc = parser.parseFromString(xmlStr, "text/xml");
            var node = xmlDoc.getElementsByTagName(key)[0];
            if (node && node.childNodes[0]) {
                return node.childNodes[0].nodeValue;
            }
        }
        catch (e) {
            //log the error
        }
    }
    return "";
}

/**
 * Reports whether required parameters are valid.
 *
 * @return    True if all required parameters are valid,
 *            false if any of the required parameters are invalid.
 */
export function requiredParamsValid(...parameters: any[]): boolean {
    for (var i = 0; i < parameters.length; i++) {
        var argument = parameters[i];
        if (argument === undefined || argument === null) {
            return false;
        }
    }
    return true;
}


/**
 * Reports whether a string has a given prefix.
 *
 * @param str       The target string.
 * @param prefix    The specific prefix string.
 *
 * @return          True if the string has the prefix, false if not.
 */
export function strStartsWith(str: string, prefix: string): boolean {
    if (typeof str != "string") {
        return false;
    }
    return str.indexOf(prefix) === 0;
}
