import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import appcomponent from '../../src/components/appcomponent.vue'

describe('appcomponent.vue', () => {
  it('App has a deck, 52 cards in a single deck, and 3 buttons', () => {
    const wrapper = shallowMount(appcomponent)
    expect(wrapper.findAll('button').length).to.equal(3)
    expect(wrapper.findAll('.card').length).to.equal(52)
    expect(wrapper.contains('.deck')).to.be.true
  })
  
  it('shuffles card in a deck', () => {
    const wrapper = shallowMount(appcomponent)
    wrapper.vm.shuffle();
    expect(wrapper.vm.deck).to.change;
  })
  
  it('removes a card from deck', () => {
    const wrapper = shallowMount(appcomponent)
    wrapper.vm.remove(1);
    expect(wrapper.vm.deck).length.to.equal(51);
  })

  it('adds a card to drawn deck', () => {
    const wrapper = shallowMount(appcomponent)
    wrapper.vm.remove(1);
    expect(wrapper.vm.drawn).length.to.equal(1);
  })
  

  it('orders card from drawn deck', () => {
    const wrapper = shallowMount(appcomponent)
    wrapper.vm.shuffle();
    wrapper.setData({drawn: wrapper.vm.deck})
    
    //wrapper.setData({drawn: wrapper.vm.deck})
    wrapper.vm.sort();
    var a = true;
    for (let i = 0; i < ((wrapper.vm.drawn).length) - 1; i++){
      if(wrapper.vm.drawn[i].card_id > wrapper.vm.drawn[i+1].card_id){
        a = false
      }
    }
    expect(a == true)
  })

})
