export const template = `
/**
 * \${font.family} (\${font.category}) \${font.version} (\${font.lastModified}) | \${size} KB
 * 
 * [View \${font.family} on Google Fonts](https://fonts.google.com/specimen/\${font.family.replace(/ /g, "+")})
 * @module
 */

/** \${font.family} (\${font.category}) | \${size} KB | see https://fonts.google.com/specimen/\${font.family.replace(/ /g, "+")} */
export const name = "\${font.family}";
/** \${font.family} (\${font.category}) | \${size} KB | see https://fonts.google.com/specimen/\${font.family.replace(/ /g, "+")} */
export const base64: string = "\${base64}";
/** \${font.family} (\${font.category}) | \${size} KB | see https://fonts.google.com/specimen/\${font.family.replace(/ /g, "+")} */
export const \${font_name} = {
    /** \${font.family} (\${font.category}) | \${size} KB */
    name,
    /** \${font.family} (\${font.category}) | \${size} KB */
    base64
};
export default \${font_name};
`;
