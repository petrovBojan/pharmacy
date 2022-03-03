export class FileUtils {
    
    static convertFileToBase64(file: any): Promise<string | ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = error => reject(error);
        });
    }

}