import { fromJson } from 'angular';

const HoverEffectDirective = () => ({
    restict: 'A',
    link: (scope, element, attributes) => {
        const { text, background, hoverText, hoverBackground } = fromJson(attributes.appHoverEffect || '{}');
        const colors = `${text ? text : 'black-text'} ${background ? background : 'white'}`;
        const hoverColors = `${hoverText ? hoverText : 'white-text'} ${hoverBackground ? hoverBackground : 'black'}`;

        element.addClass('hover-effect');
        
        element.bind('mouseenter', () => {
            element.removeClass(colors);
            element.addClass(hoverColors);
        });

        element.bind('mouseleave', () => {
            element.removeClass(hoverColors);
            element.addClass(colors);
        });
    }
})

export default HoverEffectDirective;