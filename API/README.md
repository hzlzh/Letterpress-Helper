*Different `API` versions:* 
  
----
**PHP:***(Jsonp)* `../API/PHP/`   
-- base on `codeigniter 2.1.3`  
**Example:**  
Find words with length = 9 :  
`http://dicts.zlz.im/api/index/nkhsdyeimwkihfprqooeujfrv/9`  
Find words with length > 0 :   
`http://dicts.zlz.im/api/index/nkhsdyeimwkihfprqooeujfrv/0`  
Find words with `abcde` > 0 :   
`http://dicts.zlz.im/api/index/abcde/0` 

----
**Python:***(Command line)*  
**Example:**  
Find words with length > 9 : 
>bash_$: python letterpress-helper.py 9 nkhsdyeimwkihfprqooeujfrv

Find words with `abcde` > 0 :  
>bash_$: python letterpress-helper.py 0 abced