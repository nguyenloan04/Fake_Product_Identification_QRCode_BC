// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract User {
    struct UserData {
        uint userId;
        string username;
        string password; // Đã hash phía client
        string name;
        string authorizeId;
        string birthday;
        string email;
        uint role;
        address wallet;
    }

    mapping(uint => UserData) private usersById;
    mapping(string => UserData) private usersByUsername;
    mapping(address => string) private usernamesByAddress;

    uint private nextUserId = 1;

    /// Đăng ký user (mỗi ví chỉ 1 tài khoản)
    function registerUser(
        string memory _username,
        string memory _password,
        string memory _name,
        string memory _authorizeId,
        string memory _birthDay,
        string memory _email,
        uint _role
    ) public {
        require(bytes(usernamesByAddress[msg.sender]).length == 0, "Address already registered");
        require(bytes(usersByUsername[_username].username).length == 0, "Username already exists");

        UserData memory newUser = UserData({
            userId: nextUserId,
            username: _username,
            password: _password,
            name: _name,
            authorizeId: _authorizeId,
            birthday: _birthDay,
            email: _email,
            role: _role,
            wallet: msg.sender
        });

        usersById[nextUserId] = newUser;
        usersByUsername[_username] = newUser;
        usernamesByAddress[msg.sender] = _username;

        nextUserId++;
    }

    /// Đăng nhập bằng username và password (đã hash phía frontend)
    function login(string memory _username, string memory _password) public view returns (bool) {
        UserData memory user = usersByUsername[_username];
        return (
            bytes(user.username).length > 0 &&
            hashPassword(_password) == hashPassword(user.password) &&
            user.wallet == msg.sender
        );
    }

    /// Lấy thông tin user theo username (ẩn mật khẩu)
    function getUserByUsername(string memory _username)
    public
    view
    returns (uint, string memory, string memory, string memory, string memory, uint, string memory, string memory, address)
    {
        UserData memory user = usersByUsername[_username];
        return (
            user.userId,
            user.username,
            "********", // ẩn mật khẩu
            user.name,
            user.authorizeId,
            user.role,
            user.birthday,
            user.email,
            user.wallet
        );
    }

    /// Lấy thông tin user theo ví đang gọi
    function getMyUser() public view returns (
        uint, string memory, string memory, string memory, string memory, uint, string memory, string memory, address
    ) {
        string memory username = usernamesByAddress[msg.sender];
        require(bytes(username).length > 0, "Wallet not registered");
        return getUserByUsername(username);
    }

    /// Kiểm tra ví đã đăng ký chưa
    function isWalletRegistered(address user) public view returns (bool) {
        return bytes(usernamesByAddress[user]).length > 0;
    }

    /// Hash password bằng keccak256 (bên frontend nên hash trước nếu muốn ẩn)
    function hashPassword(string memory _password) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_password));
    }
    /// Lấy username từ địa chỉ ví
    function getUsernamesByAddress(address _wallet) public view returns (string memory) {
        return usernamesByAddress[_wallet];
    }
    function getWalletByUsername(string memory _username) public view returns (address) {
        return usersByUsername[_username].wallet;
    }
}
