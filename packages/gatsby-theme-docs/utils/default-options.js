module.exports = ({
    // setting options here
    basePath = '/',
    // bydefault the contentpath should be docs
    contentPath = 'docs',
    // just hoping that site is not using MDX
    useExternalMDX = false,
}) => ({basePath, contentPath, useExternalMDX})