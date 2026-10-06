import test from 'node:test';
import assert from 'node:assert/strict';
import {allocateVariant,getVariant,variantFromLocation,routeLead,validateContact} from '../src/flow.mjs';
const lead={industry:'energy',need:'data',volume:'large',stage:'project'};
test('assignment boundaries and invalid random values',()=>{
 assert.deepEqual([0,1/3-Number.EPSILON,1/3,2/3,0.999].map(allocateVariant),['a','a','b','c','c']);
 for(const n of [-1,1,NaN,Infinity]) assert.throws(()=>allocateVariant(n),RangeError);
 assert.equal(getVariant('unknown'),'a');
});
test('only complete valid answers can be routed',()=>{
 assert.equal(routeLead(lead),'business');
 assert.equal(routeLead({...lead,industry:'invented'}),'incomplete');
 assert.equal(routeLead({stage:'private'}),'incomplete');
 assert.equal(routeLead({...lead,stage:'private'}),'not-business');
});
test('small or uncertain businesses retain a review path',()=>{
 for(const patch of [{volume:'small'},{volume:'unknown'},{stage:'research'}]) assert.equal(routeLead({...lead,...patch}),'review');
});
test('contact checks require all three fields without rejecting freemail domains',()=>{
 assert.deepEqual(Object.keys(validateContact({name:' ',company:'',email:'invalid'})),['name','company','email']);
 assert.deepEqual(validateContact({name:'Beispiel',company:'Beispiel GmbH',email:' demo@gmail.com '}),{});
});

test('direct variant paths take precedence and legacy links remain usable',()=>{
 assert.equal(variantFromLocation('/'),'a');
 assert.equal(variantFromLocation('/1'),'a');
 assert.equal(variantFromLocation('/2'),'b');
 assert.equal(variantFromLocation('/3/'),'c');
 assert.equal(variantFromLocation('/2','?variant=c'),'b');
 assert.equal(variantFromLocation('/','?variant=c'),'c');
 assert.equal(variantFromLocation('/unknown','?variant=b'),'a');
});
