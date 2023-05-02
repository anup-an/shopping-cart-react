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
            <div className="flex justify-center items-center border rounded shadow-xl p-4">
                <div className="flex flex-col justify-center">
                    <div className="animate-spin w-8 h-8">
                        <svg
                            className="fill-current text-red-500 "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M14.66 15.66A8 8 0 1117 10h-2a6 6 0 10-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
                        </svg>
                    </div>
                    <div className="text-lg">{message}</div>
                </div>
            </div>
        );
    }
}

export default Loader;
