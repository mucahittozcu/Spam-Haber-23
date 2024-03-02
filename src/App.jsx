import { useState } from 'react'
import emailList from './data/emailList'
import TopText from './components/TopText'
import './styles.css'
export default function App() {
  // //kullanıcının girdiği e-posta adresini tutar.
  const [userInput, setUserInput] = useState('')
  // // mevcut e-posta adresini tutar.
  const [userEmail, setUserEmail] = useState('') 
  // //e-posta adresinin yinelenip yinelenmediğini tutar.
  const [duplicate, setDuplicate] = useState(null)

  function handleChange(e) {
    setUserInput(e.target.value)
    
  }

  /* Challenge

    Kullanıcı "Abone Ol" butonuna tıkladığında hiçbir şey olmuyor. Sizin göreviniz bu görevleri tamamlayarak kayıt formunun çalışmasını sağlamaktır: 
    
        1. Kullanıcı "Abone Ol" butonuna tıkladığında aşağıdakiler gerçekleşmelidir: 
			a. userEmail state'i userInput state'i içinde saklanan string'e ayarlanmalıdır.
			b. userInput state'i ilk state'ine - boş bir string - geri ayarlanmalıdır.  
			c. Kodunuz, kullanıcının girdiği email adresinin emailList array'inde zaten mevcut olup olmadığını büyük/küçük harfe duyarlı olmayan bir şekilde kontrol etmelidir. Eğer varsa, yinelenen state true olarak ayarlanmalıdır. Aksi takdirde, false olarak ayarlanmalıdır. 
        
        2. Formu aşağıdaki üç email adresi ile test etmelisiniz: 
		
				  		  Email		 			              Beklenen Sonuç 				  
			╷-----------------------------╷-----------------------------╷					
		  |     noDuplicate@gmail.com   |	  non-duplicate message     |
			|-----------------------------|-----------------------------|
			|  TestyMcTesterson@gmail.com |	   duplicate message      	|
			|-----------------------------|-----------------------------|
			|  testymctesterson@gmail.com |		  duplicate message       |	
			¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯	
            
        3. Yukarıdakileri doğru bir şekilde yapıp "Abone Ol" butonuna tıklarsanız, input'un placeholder metninin " Arkadaşınızı abone yapın" haline geldiğini ve başka bir email adresi girip onu da kontrol edebildiğinizi görmelisiniz.
 */

const handleSubmit = (e) => {
  // // Kullanıcı girdisini al ve küçük harfe dönüştür.
  const newValue = userInput.toLowerCase()


  // //emailList: Dizisinde her bir öğeyi dolaşır ve kullanıcının girdiği e-posta adresiyle eşleşen bir öğe bulunup bulunmadığını kontrol eder. 
  const isDuplicate = emailList.some(item => item.toLowerCase() === newValue)
  
  // Eğer e-posta adresi daha önce listeye eklenmişse e-posta adresini (userEmail) state'ine ekler.
  if (isDuplicate) {
    setDuplicate(true)

  } else {
    setDuplicate(false)

    // Eğer e-posta adresi listeye eklenmemişse, yeni e-postayı emailList'e ekle.
    setUserEmail(newValue)
  }
  // // Input alanını temizle.
  setUserInput("")
  
  // // Formun varsayılan davranışını engelle.
  e.preventDefault()
}

  return (
    <form className='form' onSubmit={handleSubmit}>
      <TopText userEmail={userEmail} duplicate={duplicate} />

      <div>
        <input
          required
          placeholder={
           // // (userEmail) state'i boşsa "E-mail adresinizi girin", doluysa "Arkadaşınızı abone yapın" olarak ayarlanır.
            !userEmail ? 'E-mail adresinizi girin' : 'Arkadaşınızı abone yapın'
          }
          type='email'
          name='email'
          onChange={handleChange}
          value={userInput}
        />

        <button type='submit'>Abone Olun</button>
      </div>
    </form>
  )
}
