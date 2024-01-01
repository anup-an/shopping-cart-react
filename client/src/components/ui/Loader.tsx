import React from 'react';

interface IProps {
    message: string;
}
class Loader extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        const { message } = this.props;
        return (
            <div className="flex justify-center items-center p-4">
                <div className="flex flex-col justify-center">
                    <img src="/images/undraw_loading_re_5axr.svg" className="h-64" />
                    <div className="flex items-center">
                        <div className="text-lg mr-2">{message}</div>
                        <div className="flex animate-pulse">
                            <div className="mr-2 bg-blue-600 p-2  w-4 h-4 rounded-full blue-circle"></div>
                            <div className="bg-green-600 p-2 w-4 h-4 rounded-full green-circle"></div>
                            <div className="ml-2 bg-red-600 p-2  w-4 h-4 rounded-full red-circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
