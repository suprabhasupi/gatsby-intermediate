const withDefaults = require('./utils/default-options');

module.exports = options => {
    // need to tell file system where to look
    // useExternalMDX will check whether we should load the external MDX plugin or not
    const {contentPath, useExternalMDX} = withDefaults(options);
    return {
        plugins: [
            {
                resolve: 'gatsby-source-filesystem',
                options: {
                    name: 'gatsby-theme-docs',
                    path: contentPath
                }
            },
            !useExternalMDX && {
                resolve: 'gatsby-plugin-mdx',
                options: {
                    dafaultLayouts: {
                        // if its mdx file, then gatsby will look for this layout to load the page
                        default: require.resolve('./src/components/layout.js')
                    }
                }
            }
        ].filter(Boolean)
    }
}