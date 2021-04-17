export function condition(condition){
    const colorCold = '#1ec9ff';
    const colorHot = '#FFB300';
    switch(condition){
        case 'storm':
            return icon = {
                name: 'rainy-outline',
                color: colorCold
            };
            break;
        case 'clear_day':
            return icon = {
                name: 'partly-sunny-outline',
                color: colorHot
            };
            break;
        
        case 'rain':
            return icon = {
                name: 'rainy-outline',
                color: colorCold
            };
            break
        default:
            return icon = {
                name: 'cloud-outline',
                color: colorCold
            };
    }
}