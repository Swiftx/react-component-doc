export const module = {
    rules: [
        {
            test: /\.tsx?$/,
            use: [{loader: 'ts-loader'}]
        },
        {
            test: /\.css$/,
            use : [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ]
        },
        {
            test: /\.md$/,
            use: [
                {loader: "html-loader"},
                {loader: "markdown-loader"}
            ]
        }
    ]
};

export const resolve = {
    extensions:  ['.tsx', '.ts', '.js', '.jsx']
};