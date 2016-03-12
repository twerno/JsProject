namespace StringUtils {

    export function msPrettyPrint( milliseconds: number ): string {
        return ( Math.ceil( milliseconds / 10 ) / 100 ).toString() + 's';
    }

}