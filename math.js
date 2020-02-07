
	function normalize(a){
		var x=a.x;
		var y=a.y;
		var z=a.z;
		var n = x * x + y * y + z * z;
	  
		n=Math.sqrt(n);
	    n = 1.0 / n;
	    x *= n;
	    y *= n;
	    z *= n;
	    var r={x:0,y:0,z:0};
	    r.x=x;
	    r.y=y;
	    r.z=z;
	   	return r;
	}

	function dot(a,b){
		return a.x*b.x+a.y*b.y+a.z*b.z;
	}

	function cross(a,b){
		var c={x:0,y:0,z:0};
		c.x=a.y*b.z-a.z*b.y;
		c.y=a.z*b.x-a.x*b.z;
		c.z=a.x*b.y-a.y*b.x;
		return c;
	}

	function add(a,b){
		var c={x:0,y:0,z:0};
		c.x=a.x+b.x;
		c.y=a.y+b.y;
		c.z=a.z+b.z;
		return c;
	}

	function sub(a,b){
		var c={x:0,y:0,z:0};
		c.x=a.x-b.x;
		c.y=a.y-b.y;
		c.z=a.z-b.z;
		return c;
	}

	function triangle(a,b,c,color){
		var minx=a.x<b.x?a.x:b.x;
		minx=minx<c.x?minx:c.x;
		var miny=a.y<b.y?a.y:b.y;
		miny=miny<c.y?miny:c.y;
		var maxx=a.x>b.x?a.x:b.x;
		maxx=maxx>c.x?maxx:c.x;
		var maxy=a.y>b.y?a.y:b.y;
		maxy=maxy>c.y?maxy:c.y;
		var AB=sub(b,a);
		AB.z=0;
		var AC=sub(c,a);
		AC.z=0;
		for(var i=minx;i<maxx;i+=1){
			for(var j=miny;j<maxy;j+=1){
				var p={x:0,y:0,z:0};
				p.x=i;p.y=j;var AP=sub(p,a);
				var u=(dot(AP,AC)*dot(AB,AB)-dot(AP,AB)*dot(AC,AB))/(dot(AC,AC)*dot(AB,AB)-dot(AC,AB)*dot(AC,AB));
				var v=(dot(AP,AB)*dot(AC,AC)-dot(AP,AC)*dot(AB,AC))/(dot(AC,AC)*dot(AB,AB)-dot(AC,AB)*dot(AC,AB));
				//console.log(a.z+u*AB.z+v*AC.z);
					var ab=sub(b,a);
					var ac=sub(c,a);
				if(u>=0&&v>=0&&u+v<=1){	point(i,j,(a.z+u*ab.z+v*ac.z),color);}
			}
		}

	}


	
	function MxV(m,v){
		v.w=1;
		var p={x:0,y:0,z:0,w:0};
		p.x=v.x*m[0]+v.y*m[1]+v.z*m[2]+v.w*m[3];
		p.y=v.x*m[4]+v.y*m[5]+v.z*m[6]+v.w*m[7];
		p.z=v.x*m[8]+v.y*m[9]+v.z*m[10]+v.w*m[11];
		p.w=v.x*m[12]+v.y*m[13]+v.z*m[14]+v.w*m[15];
		return p;
	}


	function MxM(m1,m2){
		var product=new Array(16);
		
		product[0]  = m1[0] * m2[0]  + m1[4] * m2[1] + m1[8]   * m2[2]  + m1[12] * m2[3];
		product[1]  = m1[1] * m2[0]  + m1[5] * m2[1] + m1[9]   * m2[2]  + m1[13] * m2[3];
		product[2]  = m1[2] * m2[0]  + m1[6] * m2[1] + m1[10]  * m2[2]  + m1[14] * m2[3];
		product[3]  = m1[3] * m2[0]  + m1[7] * m2[1] + m1[11]  * m2[2]  + m1[15] * m2[3];

		product[4]  = m1[0] * m2[4]  + m1[4] * m2[5] + m1[8]   * m2[6]  + m1[12] * m2[7];
		product[5]  = m1[1] * m2[4]  + m1[5] * m2[5] + m1[9]   * m2[6]  + m1[13] * m2[7];
		product[6]  = m1[2] * m2[4]  + m1[6] * m2[5] + m1[10]  * m2[6]  + m1[14] * m2[7];
		product[7]  = m1[3] * m2[4]  + m1[7] * m2[5] + m1[11]  * m2[6]  + m1[15] * m2[7];

		product[8]  = m1[0] * m2[8]  + m1[4] * m2[9] + m1[8]   * m2[10] + m1[12] * m2[11];
		product[9]  = m1[1] * m2[8]  + m1[5] * m2[9] + m1[9]   * m2[10] + m1[13] * m2[11];
		product[10] = m1[2] * m2[8]  + m1[6] * m2[9] + m1[10]  * m2[10] + m1[14] * m2[11];
		product[11] = m1[3] * m2[8]  + m1[7] * m2[9] + m1[11]  * m2[10] + m1[15] * m2[11];

		product[12] = m1[0] * m2[12] + m1[4] * m2[13] + m1[8]  * m2[14] + m1[12] * m2[15];
		product[13] = m1[1] * m2[12] + m1[5] * m2[13] + m1[9]  * m2[14] + m1[13] * m2[15];
		product[14] = m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14] * m2[15];
		product[15] = m1[3] * m2[12] + m1[7] * m2[13] + m1[11] * m2[14] + m1[15] * m2[15];

		return product;
	}