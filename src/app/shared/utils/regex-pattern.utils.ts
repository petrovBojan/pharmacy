export class RegexPatternUtils {

    public static readonly HTTPS_URL: RegExp = 
    /^https:\/\/(?!.{256})(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{1,63}|xn--[a-z0-9]{1,59}.)$/;

    public static readonly LETTERS_NUMBERS: RegExp = /^[a-zA-Z0-9]+$/;

    public static readonly IMAGE_TYPE: RegExp =
    /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.jpeg|.png)$/;

    public static readonly WEBSITE_LINK: RegExp = 
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z]{2,}\b([^\s]*)$/;

    public static readonly EMAIL: RegExp =
    /^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@(?!.{256})(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{1,63}|xn--[a-z0-9]{1,59}.)$/;

    public static readonly PHONE: RegExp = /^[+]?\s{0,1}([0-9]\d{0,15}\s{0,1}){0,15}$/;

    public static readonly NUMBERS_ONLY: RegExp = /^[0-9]*$/;

    public static readonly DECIMAL_NUMBER: RegExp = /^\d+([\.\,]\d{1,3})?$/;

    public static readonly YOUTUBE_IFRAME_LINK: RegExp = 
    ///^(?:https?:\/\/)?((?:www|m)\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/;
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

    //letters, numbers, in-between hypnen and spaces
    public static readonly TOPIC: RegExp = /^[\w]+([-\s]{1}[a-z0-9]+)*$/i;

    public static readonly DOCUMENT_MIMETYPE: RegExp =
    /^application\/(pdf|msword|(vnd\.(ms-powerpoint|openxmlformats-officedocument.presentationml.presentation|openxmlformats-officedocument.wordprocessingml.document).*))$|^text\/plain$/i;
    public static readonly VALID_HOST_NAME: RegExp = /^(?!:\/\/)([a-zA-Z0-9]+\.)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i;
}