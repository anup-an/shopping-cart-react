import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class Error extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div className="inline-block flex items-center justify-center">
            <div className="flex flex-col items-center justify-center border shadow-xl rounded p-4">
                <div className="flex flex-row items-center justify-center">
                    <p className="text-bold text-5xl">4</p>
                    <p className="text-bold text-5xl text-red-500">0</p>
                    <p className="text-bold text-5xl">4</p>
                </div>
                <p>THE PAGE YOU REQUESTED CAN NOT BE FOUND</p>
                <button
                    onClick={() => this.props.history.push('/')}
                    className="p-2 bg-blue-400 hover:bg-blue-800 text-white border rounded"
                >
                    Go to home
                </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Error);