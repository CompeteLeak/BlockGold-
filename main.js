const SHA256 = require("crypto-js/sha256");
//Hash import 
var count = 1; 
//count variable 

class Block {
    constructor(index, timestamp, data, previousHash = '',Validate) {
        this.index = count;
        this.previousHash = previousHash;
        this.timestamp = Date.now();
        this.data = data;
        this.nonce = 0; 
        this.hash = this.calculateHash();
        //this.Validate = this.isChainValid(); 
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
      //create hash from block information 
    }

     mine(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++; 
            this.hash = this.calculateHash(); 
        }
        console.log("Block Mined: " + this.hash ); 
    }

    
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; 
        // set zeros before hash to increase difficuty 
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
        count ++; 
        // create first block 
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
        //get current block 
    }

    addBlock(newBlock) {

        console.log("Mining block " + count); 

        newBlock.previousHash = this.getLatestBlock().hash;
        //records previous hash on  new block 
        //newBlock.hash = newBlock.calculateHash();
        newBlock.mine(this.difficulty); 
        //newBlock.timestamp = Date.now(); 
        //newBlock.Validate = this.isChainValid;
        count ++; 

        
        this.chain.push(newBlock);
        
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            } // if current hash does not equal calculated hash block not valid 

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }// if previous-hash does not equal blocks previous hash block chain not valid 
        }

        return true;
    }
}

function myFunction () {
    var nuggets  = new Blockchain(); 
    nuggets.addBlock(new Block(1, '20/07/2017', { amount: 4 }));
    
    
}

x = 0 ; 

while (x <5){
    myFunction(); 
    x++; 
}


// let nuggets = new Blockchain();

//console.log("Mining block 1.."); 
//nuggets.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
// savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 8 }));
// console.log("Mining block 3.."); 
// savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 10 }));


//console.log('Blockchain valid? ' + savjeeCoin.isChainValid());

//console.log('Changing a block...');
//savjeeCoin.chain[1].data = { amount: 100 };
// savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();


 //console.log(JSON.stringify(savjeeCoin, null, 4));
 //console.log("Blockchain valid? " + savjeeCoin.isChainValid());
 //document.getElementById("demo") = nuggets.addBlock(new Block(1, "20/07/2017", { amount: 4 }));// console.log("Mining block 2.."); 
