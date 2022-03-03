import { ElementRef } from '@angular/core';
import { RegexPatternUtils } from './regex-pattern.utils';

export class ImageUtils {
    public static readonly maxEventLogoSize: number = 5242880; // 5 MB
    public static readonly maxCoverPhotoSize: number = 5242880; // 5 MB
    public static readonly maxEventLogoNameLength: number = 300;
    public static readonly maxCoverPhotoNameLength: number = 300;
    public static readonly placeholderPath = 'assets/images/logo_placeholder.png';
    public static readonly placeholderCompany = 'assets/images/company.png';
    public static readonly placeholderCompanyAlt = 'assets/images/company_placeholder.png';
    public static readonly CDN_BASE_URL = 'https://d1kglcy9tturzq.cloudfront.net/';
    public static readonly staticLogoPath = 'StaticExpostudio/assets/logo/';
    public static readonly CDN_BASE_FOLDER = 'ExpoStudio';

    static isOfTypeImage(mimeType: string): boolean {
        return mimeType.match(RegexPatternUtils.IMAGE_TYPE) != null;
    }

    static getRelativeCoverPhotoCDNPath(eventId: number): string {
        return `ExpoStudio/${eventId}/CoverPhoto/`;
    }

    static getRelativeLogoCDNPath(eventId: number): string {
        return `ExpoStudio/${eventId}/CMS/Logo/`;
    }

    static displayUploadedImage(file: File, elementRef: ElementRef): void {
        const fileReader = new FileReader();
    
        if (!elementRef || !elementRef.nativeElement)
            return;
        
        const img = elementRef.nativeElement;

        fileReader.onload = () => {
            img.src = fileReader.result.toString();
        }

        fileReader.readAsDataURL(file);
    }

    static getFullCDNPath(relativePath: string): string {
        return (relativePath && relativePath.length !== 0) ?
         `${this.CDN_BASE_URL}${relativePath}`
          : 
          this.placeholderPath; 
    }
    static getFullCDNPathCompany(relativePath: string): string {
        return (relativePath && relativePath.length !== 0) ?
         `${this.CDN_BASE_URL}${relativePath}`
          : 
          this.placeholderCompany; 
    }

    static getFileNameFromPath(relativePath: string): string {
        if(!relativePath) {
            return 'No file chosen';
        }
        const pathArray = relativePath.split('/');
        const fileName = pathArray[pathArray.length - 1];
        return this.truncate(fileName);
    }

    static convertBase64ToFile(base: string, fileName: string) : File {
        if(!base || !fileName) {
            return null;
        }
        const byteString = base.split(',');
        const mimeType = byteString[0].match(/:(.*?);/)[1];
        const decodedBase = window.atob(byteString[1]);
        const byteArray = new Uint8Array(decodedBase.length);
        for(let i = 0; i < decodedBase.length; ++i) {
            byteArray[i] = decodedBase.charCodeAt(i);
        }
        return new File([byteArray], fileName, {type: mimeType});
    }

    static truncate(fileName: string, maxLength: number = 36): string {
        if(fileName.length > maxLength) {
            const diff = fileName.length - maxLength;
            const str = fileName.substr(0, diff);
            return fileName.replace(str, '...');
        }
        return fileName;
    }

    static convertBytesToMB(bytes: number): number {
        return bytes / 1048576;
    }

}