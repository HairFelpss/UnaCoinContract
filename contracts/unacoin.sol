pragma solidity >=0.4.25 <0.6.0;

contract UnaCoin {
    
    string public constant name = "Una Coin";
    string public constant symbol = "UNC";
    uint8 public constant decimals = 2;
    uint8 public constant dificulty = 2;
    
    uint _totalSupply;
    
    mapping(address => uint) _balance;
    
    mapping(address =>  mapping(address => uint)) _allowance;

    event Transfer(address indexed from, address indexed to, uint tokens);
    
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    
    constructor() public {
        _totalSupply = 60000*10**uint(decimals);
        _balance[msg.sender] = _totalSupply;
    }
    
    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }
    
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return _balance[tokenOwner];
    }
    
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
            return _allowance[tokenOwner][spender];
    }
    
    function approve(address spender, uint tokens) public returns (bool success) {
        _allowance[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return (true);
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        require(_balance[msg.sender] >= tokens);
        require(_balance[to] + tokens >= _balance[to]);
        _balance[msg.sender] -= tokens;
        _balance[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return (true);
    }
    
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        require(_balance[from] >= tokens);
        require(_balance[to] + tokens >= _balance[to]);
        _balance[from] -= tokens;
        _balance[to] += tokens;
        emit Transfer(msg.sender, to, tokens);
        return (true);
    }

}