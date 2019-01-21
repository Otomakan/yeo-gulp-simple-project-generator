console.log('hey it looks like it worked! Happy Hacking!')


ready(function(){
    //Mimics the bootstrap JS to open navBar
    let buttonNav = document.getElementsByClassName('navbar-toggler')[0]
    let navBarNav = document.getElementsByClassName('navbar-nav')[0]
    let contentNav = document.getElementById('navbarNavAltMarkup')
    let show = false
    buttonNav.onclick=(()=>{
        show = !show

        //Check the status of the show variable and add or remove show class accordingly
        if(show){
          contentNav.classList.add('show')
          navBarNav.classList.add('show')
        }
        else{
          contentNav.classList.remove('show')
          navBarNav.classList.remove('show')
        }
    })
  })


//Thanks to http://youmightnotneedjquery.com/#ready
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}