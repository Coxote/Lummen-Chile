import { useEffect } from 'react';

export const GoogleAnalytics = () => {
  useEffect(() => {
    // Google Tag Manager script
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-M293BG6J');
    `;

    // Create gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z5FPD3R2RX';
    
    // Create inline script
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z5FPD3R2RX');
    `;

    // LinkedIn Insight Tag - Part 1
    const linkedInScript1 = document.createElement('script');
    linkedInScript1.type = 'text/javascript';
    linkedInScript1.innerHTML = `
      _linkedin_partner_id = "8971250";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `;

    // LinkedIn Insight Tag - Part 2
    const linkedInScript2 = document.createElement('script');
    linkedInScript2.type = 'text/javascript';
    linkedInScript2.innerHTML = `
      (function(l) { 
        if (!l){
          window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]
        } 
        var s = document.getElementsByTagName("script")[0]; 
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.async = true; 
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; 
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);
    `;

    // Insert scripts into head in order
    document.head.appendChild(gtmScript);
    document.head.appendChild(gtagScript);
    document.head.appendChild(inlineScript);
    document.head.appendChild(linkedInScript1);
    document.head.appendChild(linkedInScript2);

    // LinkedIn noscript pixel
    const linkedInNoscript = document.createElement('noscript');
    linkedInNoscript.innerHTML = `
      <img height="1" width="1" style="display:none;" alt="" 
           src="https://px.ads.linkedin.com/collect/?pid=8971250&fmt=gif" />
    `;
    document.body.appendChild(linkedInNoscript);

    // Cleanup function
    return () => {
      // Scripts stay in head for analytics to work throughout session
    };
  }, []);

  return null; // This component doesn't render anything
};