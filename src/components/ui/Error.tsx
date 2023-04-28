import React from 'react';

interface IProps {
    fetch: () => Promise<void>;
    message: string;
}

class Error extends React.Component<IProps> {
    render() {
        const { fetch, message } = this.props;
        return (
            <div className="text-center text-red-500 flex items-center justify-center items-center">
                <div className="flex align-center">
                    <p>{message}</p>
                </div>
                <button
                    className="ml-2 flex items-center justify-center boreder rounded bg-red-500 hover:bg-red-600 text-white p-2 focus:outline-none"
                    type="button"
                    onClick={fetch}
                >
                    <p>Click to retry</p>
                </button>
            </div>
        );
    }
}

export default Error;
