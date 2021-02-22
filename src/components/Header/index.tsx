import React from 'react';

const Header = (): JSX.Element => {
    return (
        <div className="flex flex-row bg-blue-800 text-white text-xl justify-between p-4">
            <div>Shopping cart</div>
            {/* <div>Admin</div> */}
        </div>
    );
};
export default Header;
