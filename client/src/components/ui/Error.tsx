import React from 'react';

interface IProps {
    fetch: () => Promise<void>;
    message: string;
}

class Error extends React.Component<IProps> {
    render() {
        const { fetch, message } = this.props;
        return (
            <div className="text-center text-red-500">
                <img src="/images/undraw_not_found_re_bh2e.svg" className="h-64" />
                <div className="flex mt-4 items-center">
                    <p>{message}</p>
                    <button
                        className="ml-2 flex items-center justify-center boreder rounded bg-red-500 hover:bg-red-600 text-white p-2 focus:outline-none"
                        type="button"
                        onClick={fetch}
                    >
                        <p>Click to retry</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default Error;
