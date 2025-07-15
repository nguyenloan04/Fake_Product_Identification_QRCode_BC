// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
pragma experimental ABIEncoderV2;
// help to create NFT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

interface IUser {
    function getUserByUsername(string memory _username) external view returns (
        uint, string memory, string memory, string memory, string memory, uint, string memory, string memory, address
    );

    function getUsernamesByAddress(address) external view returns (string memory);

    function getWalletByUsername(string memory) external view returns (address);
}

contract MainSystem is ERC721 {
    IUser public userContract;
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol){

    }
    // Product Object
    struct Product {
        uint id;
        string productCode; //hash
        string title;
        string category;
        string imageUrl;
        uint pricePerKg;
        uint unitsShippedKg;
        uint unitsSoldKg;
        uint unitsOnHandKg;
        string supplier; //hash
        string farmLocation; //hash
        uint256 saleDate;
        address userId;
    }

    // Log: ghi lại nhật kí thay đổi product
    struct Log {
        uint id;
        uint timestamp;
        string content;
        string sender;
        uint productId;
    }
//mapping
    mapping(uint => bytes32) public productHashes;
    Product[] public products;
    uint public productCount;

    Log[] public logs;
    uint public logCount;


    event ProductCreated(uint indexed id, string productCode, string title, string category, string imageUrl, uint pricePerKg, uint unitsShippedKg, uint unitsSoldKg, uint unitsOnHandKg, string supplier, string farmLocation, uint saleDate, address userId);
    event ProductUpdate(uint indexed id, string productCode, string title, string category, uint pricePerKg, uint unitsShippedKg, uint unitsSoldKg, uint unitsOnHandKg, string supplier, string farmLocation, uint saleDate, address userId);
    event LogInserted(uint id, uint timestamp, string sender, uint productId);

    function setUserContractAddress(address _addr) public {
        userContract = IUser(_addr);
    }

    function createProduct(string memory _productCode, string memory _title, string memory _category, string memory _imageUrl, uint _pricePerKg, uint _unitsShippedKg, uint _unitsSoldKg, uint _unitsOnHandKg, string memory _supplier, string memory _farmLocation, uint _saleDate, address _userId) public {
        products.push(Product(productCount, _productCode, _title, _category, _imageUrl, _pricePerKg, _unitsShippedKg, _unitsSoldKg, _unitsOnHandKg, _supplier, _farmLocation, _saleDate, _userId));
        bytes32 hash = _calculateHash(_productCode, _supplier);
        productHashes[productCount] = hash;
        emit ProductCreated(productCount, _productCode, _title, _category, _imageUrl, _pricePerKg, _unitsShippedKg, _unitsSoldKg, _unitsOnHandKg, _supplier, _farmLocation, _saleDate, _userId);

        //
        string memory logContent = string(abi.encodePacked(
            " Product has name: ", _title,
            ", price : ", uint2String(_pricePerKg),
            ", Supplier: ", _supplier,
            ", Farm Location: ", _farmLocation
        ));
        _addLog(logContent, _supplier, productCount);
        productCount++;
    }

    function updateProduct(uint _id, string memory _productCode, string memory _title, string memory _category, uint _pricePerKg, uint _unitsShippedKg, uint _unitsSoldKg, uint _unitsOnHandKg, string memory _supplier, string memory _farmLocation, uint _saleDate, address _userId) public {
        require(_id < products.length, "Invalid product ID");
        require(address(userContract) != address(0), "User contract not set");
        Product storage product = products[_id];
        //
        string memory logContent = "Product has changes: ";
        if (keccak256(abi.encodePacked(product.productCode)) != keccak256(abi.encodePacked(_productCode))) {
            logContent = string(abi.encodePacked(logContent, "product code changes from '", product.productCode, "' to '", _productCode, "', "));
        }
        if (keccak256(abi.encodePacked(product.title)) != keccak256(abi.encodePacked(_title))) {

        }
        if (keccak256(abi.encodePacked(product.category)) != keccak256(abi.encodePacked(_category))) {

        }
        if (keccak256(abi.encodePacked(product.supplier)) != keccak256(abi.encodePacked(_supplier))) {
            logContent = string(abi.encodePacked(logContent, "supplier changes from '", product.supplier, "' to '", _supplier, "', "));
        }
        if (keccak256(abi.encodePacked(product.farmLocation)) != keccak256(abi.encodePacked(_farmLocation))) {
            logContent = string(abi.encodePacked(logContent, "farm location changes from '", product.farmLocation, "' to '", _farmLocation, "', "));
        }
        if (product.pricePerKg != _pricePerKg) {

        }
        if (product.unitsShippedKg != _unitsShippedKg) {

        }
        if (product.unitsSoldKg != _unitsSoldKg) {

        }
        if (product.unitsOnHandKg != _unitsOnHandKg) {

        }
        if (product.saleDate != _saleDate) {

        }
        console.log("product.userId", product.userId);
        console.log("userContract", address(userContract));
        string memory oldUsername = userContract.getUsernamesByAddress(product.userId);
        string memory newUsername = userContract.getUsernamesByAddress(_userId);

//        console.log("oldAddress", oldUsername);
//        console.log("newAddress", newUsername);
        if (keccak256(abi.encodePacked(oldUsername)) != keccak256(abi.encodePacked(newUsername))) {
            logContent = string(abi.encodePacked(
                logContent,
                "ownership changes from '", oldUsername,
                "' to '", newUsername, "', "
            ));
        }
//        // Loại bỏ dấu ',' cuối cùng nếu có
        if (bytes(logContent).length > 0 && bytes(logContent)[bytes(logContent).length - 1] == ',') {
            bytes memory trimmedBytes = new bytes(bytes(logContent).length - 2);
            for (uint i = 0; i < bytes(logContent).length - 2; i++) {
                trimmedBytes[i] = bytes(logContent)[i];
            }
            logContent = string(trimmedBytes);
        }
        if (bytes(logContent).length > 0) {
            emit ProductUpdate(_id, _productCode, _title, _category, _pricePerKg, _unitsShippedKg, _unitsSoldKg, _unitsOnHandKg, _supplier, _farmLocation, _saleDate, _userId);
            _addLog(logContent, _supplier, _id);
            product.productCode = _productCode;
            product.title = _title;
            product.category = _category;
            product.pricePerKg = _pricePerKg;
            product.unitsShippedKg = _unitsShippedKg;
            product.unitsSoldKg = _unitsSoldKg;
            product.unitsOnHandKg = _unitsOnHandKg;
            product.supplier = _supplier;
            product.farmLocation = _farmLocation;
            product.saleDate = _saleDate;
            product.userId = _userId;
            bytes32 hash = _calculateHash(_productCode, _supplier);
            productHashes[_id] = hash;
        }
    }

    function _addLog(string memory _content, string memory _sender, uint _productId) public {
        uint timestamp = block.timestamp;
        Log memory newLog = Log(logCount, timestamp, _content, _sender, _productId);
        logs.push(newLog);
        emit LogInserted(logCount, timestamp, _sender, _productId);
        logCount++;

    }

    function getLogsCount() public view returns (uint){
        return logCount;
    }

    function getLog(uint _index) public view returns (uint id, uint timestamp, string memory content, string memory sender, uint productId){
        require(_index < logs.length, "Invalid log index");
        Log memory log = logs[_index];
        return (log.id, log.timestamp, log.content, log.sender, log.productId);
    }

    function debugLog(uint _index) public view returns (string memory) {
        require(_index < logs.length, "Invalid log index");
        Log memory log = logs[_index];
        return string(abi.encodePacked(log.content));
    }

    function getProductCount() public view returns (uint){
        return productCount;
    }

//    function getAllProducts() public view returns (Product[] memory) {
//        return products;
//    }
    function getProduct(uint _id) public view returns (uint, string memory, string memory, string memory, string memory, uint, uint, uint, uint, string memory, string memory, uint256, address){
        Product memory product = products[_id];
//        bytes32 hash = productHashes[_id];
        return (product.id, product.productCode, product.title, product.category, product.imageUrl, product.pricePerKg, product.unitsShippedKg, product.unitsSoldKg, product.unitsOnHandKg, product.supplier, product.farmLocation, product.saleDate, product.userId);
    }

    function _calculateHash(string memory _productCode, string memory _supplier) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_productCode, _supplier));
    }

    function getProductHash(uint _id) public view returns (bytes32)  {
        require(_id < products.length, "Invalid product ID");
        return productHashes[_id];
    }
    // convert uint to string
    function uint2String(uint _i) internal pure returns (string memory _uintAsString)  {
        return Strings.toString(_i);
    }
    // concatenate two string
    function concatenateStrings(string memory _a, string memory _b) internal pure returns (string memory)  {
        return string.concat(_a, _b);
    }
    //
    function bytesToString(bytes memory data) public pure returns (string memory) {
        return string(data);
    }

    // coi lai ham nay
    function getProductByUserId(address _userId) public view returns (Product[] memory)  {
        uint counter = 0;
        for (uint i = 0; i < productCount; i++) {
            if (products[i].userId == _userId) {
                counter++;
            }
        }
        Product[] memory productsByUserId = new Product[](counter);
        uint index = 0;
        for (uint i = 0; i < productCount; i++) {
            if (products[i].userId == _userId) {
                productsByUserId[index] = products[i];
                index++;
            }
        }
        return productsByUserId;
    }
    // tạo đối tượng lưu thông tin cố định khi mua hàng
    uint public purchaseCount = 0;
    mapping(uint => ProductPurchase) public productPurchases;

    struct ProductPurchase {
        uint id;
        uint productId;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductPurchaseCreated(
        uint id,
        uint productId,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchasePurchased(
        uint id,
        uint productId,
        uint price,
        address payable owner,
        bool purchased
    );

    function createProductPurchase(uint _productId, uint _price) public {
        //
        require(_price > 0);
        //
        purchaseCount++;
        //
        productPurchases[purchaseCount] = ProductPurchase(purchaseCount, _productId, _price, payable(msg.sender), false);
        //
        emit ProductPurchaseCreated(purchaseCount, _productId, _price, payable(msg.sender), false);
    }

    function purchaseProduct(uint _id, address _userId, string memory _supplier) public payable {
        // Lấy thông tin của sản phẩm
        ProductPurchase memory _product = productPurchases[_id];
        // Lấy thông tin của chủ sở hữu
        address payable _seller = _product.owner;
        // Kiem tra id co hop le khong
        require(_product.id > 0 && _product.id <= purchaseCount);
        // Kiem tra con du Ether trong giao dich
        require(msg.value >= _product.price);
        //nguoi mua khong phai nguoi ban
        require(_seller != msg.sender);

        // lay thong tin that su cua 1 san pham
        uint productId = _product.productId;
        Product storage _realProduct = products[productId];

        // them lich su thanh toan san pham
        string memory logContent = string(abi.encodePacked(
            "Product changes the supplier from ", _realProduct.supplier, " to: ", _supplier
        ));
        _addLog(logContent, _supplier, _id);
        // update userId and supplier trong san pham
        _realProduct.userId = _userId;
        _realProduct.supplier = _supplier;

        // Transfer ownership to the buyer
        _product.owner = payable(msg.sender);
        // danh dau rang product da co so huu
        _product.purchased = true;
        // update
        productPurchases[_id] = _product;

        // send Ether
        payable(_seller).transfer(msg.value);

        // Trigger an event
        emit ProductPurchasePurchased(purchaseCount, _product.productId, _product.price, payable(msg.sender), true);
    }

    function hasProductWithProductIDAndNotPurchased(uint _productId) public view returns (bool){
        for (uint i = 1; i <= purchaseCount; i++) {
            if (productPurchases[i].productId == _productId && !productPurchases[i].purchased) {
                return true;
            }
        }
        return false;
    }

    function markProductsAsPurchased(uint _productId) public {
        for (uint i = 1; i <= purchaseCount; i++) {
            if (productPurchases[i].productId == _productId && !productPurchases[i].purchased) {
                productPurchases[i].purchased = true;
                emit ProductPurchasePurchased(productPurchases[i].id, productPurchases[i].productId, productPurchases[i].price, productPurchases[i].owner, true);
            }
        }

    }
}

