import React from 'react';

class Details extends React.Component{
    handleSave = () => {
        console.log("submit")
    }
    render() {
        return (
            <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
                <p className="text-xl lg:text-2xl">My details</p>
                <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
                    <p className="py-2 border-b w-full">Personal information</p>
                    <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
                        <div>Edit the fields and click save to update your details.</div>
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-row space-x-12">
                                <div>
                                    <p>First Name</p>
                                    <label htmlFor="firstname">
                                        <input
                                            name="firstname"
                                            id="firstname"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <label htmlFor="lastname">
                                        <input
                                            name="lastname"
                                            id="lastname"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p>Phone number</p>
                                <label htmlFor="phone">
                                    <input
                                        name="phone"
                                        id="phone"
                                        className="p-2 bg-gray-200 border rounded"
                                        required
                                    />
                                </label>
                            </div>
                            <button
                                className="w-1/4 border rounded focus:outline-none p-2 bg-blue-400 hover:bg-blue-800 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
                    <p className="py-2 border-b w-full">E-mail address</p>
                    <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
                        <div>Edit the fields and click save to update your details.</div>
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-row space-x-12">
                                <div>
                                    <p>E-mail</p>
                                    <label htmlFor="email">
                                        <input
                                            name="email"
                                            id="email"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="invisible">
                                    <p>Last Name</p>
                                    <label htmlFor="lastname">
                                        <input
                                            name="lastname"
                                            id="lastname"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p>Password</p>
                                <label htmlFor="password">
                                    <input
                                        name="password"
                                        id="password"
                                        className="p-2 bg-gray-200 border rounded"
                                        type="password"
                                        required
                                    />
                                </label>
                            </div>
                            <button
                                className="w-1/4 border rounded focus:outline-none p-2 bg-blue-400 hover:bg-blue-800 text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Details;