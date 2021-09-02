import React from 'react';

class Address extends React.Component{
    handleSave = () => {
        console.log("submit")
    }
    render() {
        return (
            <div className="border rounded shadow-xl w-full h-full p-4 flex flex-col space-y-10">
                <p className="text-2xl">My address</p>
                <form className="flex flex-col space-y-6" onSubmit={this.handleSave}>
                    <p className="py-2 border-b w-full">Shipping address</p>
                    <div className="flex flex-col space-y-4 lg:flex-row items-start lg:space-x-10">
                        <div>Edit the fields and click save to update your details.</div>
                        <div className="flex flex-col space-y-6">
                            
                            <div>
                                <p>Address</p>
                                <label htmlFor="address">
                                    <input
                                        name="address"
                                        id="address"
                                        className="p-2 bg-gray-200 border rounded w-full"
                                        required
                                    />
                                </label>
                            </div>
                            <div className="flex flex-row space-x-12">
                                <div>
                                    <p>Post code</p>
                                    <label htmlFor="postcode">
                                        <input
                                            name="postcode"
                                            id="postcode"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                                <div>
                                    <p>City</p>
                                    <label htmlFor="city">
                                        <input
                                            name="city"
                                            id="city"
                                            className="p-2 bg-gray-200 border rounded"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p>Country</p>
                                <label htmlFor="country">
                                    <input
                                        name="country"
                                        id="country"
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
            </div>
        )
    }
}

export default Address;