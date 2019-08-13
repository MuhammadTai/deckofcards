<template>
    <div id="appcomponent">
       <h1 name ="display-1" class = "main_title">Deck Of Cards</h1>
        <div class="button_div">
            <button type="button" class="btn btn-primary" v-on:click="shuffle">Shuffle</button>
            <button type="button" class="btn btn-secondary" style="margin-left:10px" v-on:click="sort">Sort Drawn Cards</button>
            <button type="button" class="btn btn-success" style="margin-left:10px" onclick="window.location.reload()">Reset Deck</button>
        </div>
         <!-- List of cards in deck array-->
        <div class="deck">
            <transition-group name="list" tag="p">
            <div v-for="card in deck" v-bind:key="card.card_id" class="card"  v-bind:class="card.card_color" v-on:click="remove(card.card_id)">
                <!--
                <div class = "card_suite" v-bind:class="[colors[card.card_suite]]">
                    {{card.card_suite}}
                </div>
                <div class = "card_value" v-bind:class="[colors[card.card_suite]]">
                    {{card.card_value}}
                </div>
                -->
                {{card.card}}
            </div>
            </transition-group>
        </div>
        <!-- List of cards in drawn array-->
        <div class="gap">
            <h2 name ="display-3">Drawn Cards</h2>
            <div class="deck">
                <transition-group name="list" tag="p">
                <div v-for="card in drawn"  v-bind:key="card.card_id" v-bind:class="card.card_color" class="card" >
                    <!--
                    <div class = "card_suite" v-bind:class="[colors[card.card_suite]]">
                        {{card.card_suite}}
                    </div>
                    <div class = "card_value" v-bind:class=[colors[card.card_suite]]>
                        {{card.card_value}}
                    </div>
                    -->
                    {{card.card}}
                </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'appcomponent',
        //all the reactive data in a data function
    data: function() {
    return{
     //the correct order of suits/value items
      //suits: ["♣","♠","♥","♦"],
     // values: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],

      //colors object used to retrive color value using suit key
      /*
      colors:{
        "♣": "black",
        "♠": "black",
        "♥": "red",
        "♦": "red",
      },
      */
      
      cards:["🃒", "🂢", "🂲", "🃂", "🃓", "🂣", "🂳", "🃃", "🃔", "🂤", "🂴", "🃄", 
             "🃕", "🂥", "🂵", "🃅", "🃖", "🂦", "🂶", "🃆", "🃗", "🂧", "🂷", "🃇", 
             "🃘", "🂨", "🂸", "🃈", "🃙", "🂩", "🂹", "🃉", "🃚", "🂪", "🂺", "🃊", 
             "🃛", "🂫", "🂻", "🃋", "🃝", "🂭", "🂽", "🃍", "🃞", "🂮", "🂾", "🃎", "🃑", "🂡", "🂱", "🃁"],
    
    //empty array which will hold card objects
      deck:[],

      drawn:[]
    }
    },
    //Created at the start of appllication 
    created: function () {
        //calling a function from from the methods object
        this.createDeck()
    },

    methods: {
        createDeck :function(){
            //deck should always start empty intially
            //this.deck=[]
            this.drawn=[]
            //id will represent the order (local to block scope)
            let id = 0;
            //inner loop first adds a single card value for multiple suits (e.g. 2 of clubs/spades/heart/diamond )
            //card objects with be pushed to the deck array in the right order
            /*
            for (let a=0; a<this.values.length; a++){
                
                for (let i=0; i<this.suits.length; i++){
                    this.deck.push({card_value:this.values[a], card_suite:this.suits[i], card_id:id})
                    id++
                
                }
            }
            
            */
           let a = 0
           while ( a<this.cards.length){
                for(let i=0; i<4; i++){
                    if (i < 2){
                        this.deck.push({card:this.cards[a], card_color: "black", card_id:id})
                    }
                    else{
                        this.deck.push({card:this.cards[a], card_color: "red", card_id:id})
                    }
                    id++
                    a++
                }
                
           }
           
        },
        //shuffle deck by using function which generates random number and sort 
        shuffle :function(){
            this.deck = this.deck.sort(() => Math.random() - 0.5);
        },

        remove :function(id){
            //remove card with the given id
            for (let a=0; a<this.deck.length; a++){
        
                if(id==this.deck[a].card_id){
                   //console.log(a)
                    //adds the removed card object to a drawn array which will be used to sort in sort method
                    //this.drawn.push({card_value:this.deck[a].card_value, card_suite:this.deck[a].card_suite, card_id:this.deck[a].card_id})
                    this.drawn.push({card:this.deck[a].card, card_color:this.deck[a].card_color, card_id:this.deck[a].card_id})
                    //removes element with 'a' index for only 1 element
                    this.deck.splice(a,1)
                    break;
                    
                }
                  
            }
        
        },
        sort :function(){
            //selection sort (linear search through array due to effiency as it works well for small arrays such as a deck)
            //length -1 due to the last checked already compares the last index value
            for (var a=0; a<(this.drawn.length-1); a++){
                //start index/smallest value
                var i = a;
                //a+1 index to compare next value with smallest value (the value compared are the ids which represent order)
                //this loop will look for the smallest value
                for (var j = i+1; j<this.drawn.length; j++){
                   
                    if(this.drawn[j].card_id < this.drawn[i].card_id){
                        //set the index  variable for smallest value 
                    
                        i = j
                        console.log("Lower")

                    }
                }
                
                //after serch for smallest value, swap the items by creating a temp array
                let tempArray = this.drawn.slice();
                //remove j indexed item from the cloned array
                tempArray.splice(i,1);
                //add the item to the lowest position
                tempArray.splice(a,0,this.drawn[i]);
                this.drawn = tempArray;

                
            }
           
        },
    }

}
</script>

<style>
#app, html, body{
    background-color: #AAB7B8;
    
}

.main_title{
    color: #0E727A;
    text-align: center;
    font-weight: bold;
    padding: 10px;
    font-size: 60px;
}

.button_div{
    padding-left: 50px;
}

.deck{
    overflow: hidden;
    margin: 20px;
    margin-left: 45px;
    padding-left: 20px;
    border: 10px solid green;
}

.gap{
    margin-top: 100px;
}

h2{
    text-align: center;
    color: rebeccapurple;
    padding: 10px;
    font-size: 45px
}
.card{
    background-color: #AAB7B8;
    float: left;
    font-size: 120px;
    height: -100px;
    margin: 10px;
    transition: width 2s;
    border-style: none;
}

.card:hover {
  background: gold;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 1s;
}
/*
.card{
    float: left;
    height: 150px;
    width: 120px;
    background-color: #D6DBDF;
    outline-color: black;
    outline-width: 1px;
    border-radius: 5px;
    margin: 10px;
}

.card_suite{
    padding-left: 5px;
    font-size: 20px
}

.card_value{
    padding-left: 7px;
    margin-top: -10px;
    font-size: 18px;
}
*/

.red{
    color: red;
}

.black{
    color: black;
}

</style>
