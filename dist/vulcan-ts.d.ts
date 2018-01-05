/** Vulcan - v8.0.0 */
/**
 * @class Vulcan
 *
 * The singleton instance, <tt>VulcanInterface</tt>, provides an interface
 * to the Vulcan. Allows you to launch CC applications
 * and discover information about them.
 */
export declare namespace Vulcan {
    /**
     * Gets all available application specifiers on the local machine.
     *
     * @return The array of all available application specifiers.
     */
    function getTargetSpecifiers(): any;
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
    function launchApp(targetSpecifier: string, focus: boolean, cmdLine: string): boolean;
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
    function isAppRunning(targetSpecifier: string): boolean;
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
    function isAppInstalled(targetSpecifier: string): boolean;
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
    function getAppPath(targetSpecifier: string): string;
    /**
     * Registers a message listener callback function for a Vulcan message.
     *
     * @param type            The message type.
     * @param callback        The callback function that handles the message.
     *                        Takes one argument, the message object.
     * @param obj             Optional, the object containing the callback method, if any.
     *                        Default is null.
     */
    function addMessageListener(type: any, callback: (executionResult: any) => void, obj: any): void;
    /**
     * Removes a registered message listener callback function for a Vulcan message.
     *
     * @param type            The message type.
     * @param callback        The callback function that was registered.
     *                        Takes one argument, the message object.
     * @param obj             Optional, the object containing the callback method, if any.
     *                        Default is null.
     */
    function removeMessageListener(type: any, callback: (executionResult: any) => void, obj: any): void;
    /**
     * Dispatches a Vulcan message.
     *
     * @param vulcanMessage   The message object.
     */
    function dispatchMessage(vulcanMessage: any): void;
    /**
     * Retrieves the message payload of a Vulcan message for the registered message listener callback function.
     *
     * @param vulcanMessage   The message object.
     * @return                A string containing the message payload.
     */
    function getPayload(vulcanMessage: any): string;
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
    function getEndPoints(): any;
    /**
     * Gets the endpoint for itself.
     *
     * Since 7.0.0
     *
     * @return                The endpoint string for itself.
     */
    function getSelfEndPoint(): string;
}
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
export declare class VulcanMessage {
    type: any;
    scope: any;
    appId: any;
    appVersion: any;
    data: any;
    static readonly TYPE_PREFIX: string;
    static readonly SCOPE_SUITE: string;
    static readonly DEFAULT_APP_ID: string;
    static readonly DEFAULT_APP_VERSION: string;
    static readonly DEFAULT_DATA: string;
    static readonly dataTemplate: string;
    static readonly payloadTemplate: string;
    constructor(type: string, appId?: any, appVersion?: any);
    /**
     * Initializes this message instance.
     *
     * @param message         A \c message instance to use for initialization.
     */
    initialize(message: any): void;
    /**
     * Retrieves the message data.
     *
     * @return A data string in XML format.
     */
    xmlData(): string;
    /**
     * Sets the message payload of this message.
     *
     * @param payload         A string containing the message payload.
     */
    setPayload(payload: string): void;
    /**
     * Retrieves the message payload of this message.
     *
     * @return                A string containing the message payload.
     */
    getPayload(): string;
    /**
     * Converts the properties of this instance to a string.
     *
     * @return The string version of this instance.
     */
    toString(): string;
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
export declare function GetValueByKey(xmlStr: string, key: any): string;
/**
 * Reports whether required parameters are valid.
 *
 * @return    True if all required parameters are valid,
 *            false if any of the required parameters are invalid.
 */
export declare function requiredParamsValid(...parameters: any[]): boolean;
/**
 * Reports whether a string has a given prefix.
 *
 * @param str       The target string.
 * @param prefix    The specific prefix string.
 *
 * @return          True if the string has the prefix, false if not.
 */
export declare function strStartsWith(str: string, prefix: string): boolean;
