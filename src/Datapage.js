import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Cell } from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



  const taiwanCities = [
    {
      id: 1,
      name: '基隆市',
      districts: ['仁愛區','信義區','中正區','中山區','安樂區','暖暖區','七堵區',],
    },
    {
      id: 2,
      name: '台北市',
      districts: ['中正區','大同區','中山區','松山區','大安區','萬華區','信義區','士林區','北投區','內湖區','南港區','文山區',],
    },
    {
      id: 3,
      name: '新北市',
      districts: ['萬里區','金山區','板橋區','汐止區','深坑區','石碇區','瑞芳區','平溪區','雙溪區','貢寮區','新店區','坪林區','烏來區','永和區','中和區','土城區','三峽區','樹林區','鶯歌區','三重區','新莊區','泰山區','林口區','蘆洲區','五股區','八里區','淡水區','三芝區','石門區',],
    },
    {
      id: 4,
      name: '桃園市',
      districts: ['中壢區','平鎮區','龍潭區','楊梅區','新屋區','觀音區','桃園區','龜山區','八德區','大溪區','復興區','大園區','蘆竹區',],
    },
    {
      id: 5,
      name: '新竹市',
      districts: ['東區', '北區', '香山區'],
    },
    {
      id: 6,
      name: '新竹縣',
      districts: ['竹北市','湖口鄉','新豐鄉','新埔鎮','關西鎮','芎林鄉','寶山鄉','竹東鎮','五峰鄉','橫山鄉','尖石鄉','北埔鄉','峨眉鄉',],
    },
    {
      id: 7,
      name: '苗栗縣',
      districts: ['竹南鎮','頭份市','三灣鄉','南庄鄉','獅潭鄉','後龍鎮','通霄鎮','苑裡鎮','苗栗市','造橋鄉','頭屋鄉','公館鄉','大湖鄉','泰安鄉','銅鑼鄉','三義鄉','西湖鄉','卓蘭鎮',],
    },
    {
      id: 8,
      name: '台中市',
      districts: ['中區','東區','南區','西區','北區','北屯區','西屯區','南屯區','太平區','大里區','霧峰區','烏日區','豐原區','后里區','石岡區','東勢區','和平區','新社區','潭子區','大雅區','神岡區','大肚區','沙鹿區','龍井區','梧棲區','清水區','大甲區','外埔區','大安區',],
    },
    {
      id: 9,
      name: '彰化縣',
      districts: ['彰化市','芬園鄉','花壇鄉','秀水鄉','鹿港鎮','福興鄉','線西鄉','和美鎮','伸港鄉','員林市','社頭鄉','永靖鄉','埔心鄉','溪湖鎮','大村鄉','埔鹽鄉','田中鎮','北斗鎮','田尾鄉','埤頭鄉','溪州鄉','竹塘鄉','二林鎮','大城鄉','芳苑鄉','二水鄉',],
    },
    {
      id: 10,
      name: '南投縣',
      districts: ['南投市','中寮鄉','草屯鎮','國姓鄉','埔里鎮','仁愛鄉','名間鄉','集集鎮','水里鄉','魚池鄉','信義鄉','竹山鎮','鹿谷鄉',],
    },
    {
      id: 11,
      name: '嘉義市',
      districts: ['東區', '西區'],
    },
    {
      id: 12,
      name: '嘉義縣',
      districts: ['番路鄉','梅山鄉','竹崎鄉','阿里山鄉','中埔鄉','大埔鄉','水上鄉','鹿草鄉','太保市','朴子市','東石鄉','六腳鄉','新港鄉','民雄鄉','大林鎮','溪口鄉','義竹鄉','布袋鎮',],
    },
    {
      id: 13,
      name: '雲林縣',
      districts: ['斗南鎮','大埤鄉','虎尾鎮','土庫鎮','褒忠鄉','東勢鄉','臺西鄉','崙背鄉','麥寮鄉','斗六市','林內鄉','古坑鄉','莿桐鄉','西螺鎮','二崙鄉','北港鎮','水林鄉','口湖鄉','四湖鄉','元長鄉',],
    },
    {
      id: 14,
      name: '台南市',
      districts: ['中西區','東區','南區','北區','安平區','安南區','永康區','歸仁區','新化區','左鎮區','玉井區','楠西區','南化區','仁德區','關廟區','龍崎區','官田區','麻豆區','佳里區','西港區','七股區','將軍區','學甲區','北門區','新營區','後壁區','白河區','東山區','六甲區','下營區','柳營區','鹽水區','善化區','大內區','山上區','新市區','安定區',],
    },
    {
      id: 15,
      name: '高雄市',
      districts: ['楠梓區','左營區','鼓山區','三民區','鹽埕區','前金區','新興區','苓雅區','前鎮區','旗津區','小港區','鳳山區','大寮區','鳥松區','林園區','仁武區','大樹區','大社區','岡山區','路竹區','橋頭區','梓官區','彌陀區','永安區','燕巢區','田寮區','阿蓮區','茄萣區','湖內區','旗山區','美濃區','內門區','杉林區','甲仙區','六龜區','茂林區','桃源區','那瑪夏區',],
    },
    {
      id: 16,
      name: '澎湖縣',
      districts: ['馬公市', '西嶼鄉', '望安鄉', '七美鄉', '白沙鄉', '湖西鄉'],
    },
    {
      id: 17,
      name: '金門縣',
      districts: ['金沙鎮','金湖鎮','金寧鄉','金城鎮','烈嶼鄉','烏坵鄉',],
    },
    {
      id: 18,
      name: '屏東縣',
      districts: ['屏東市','三地門鄉','霧台鄉','瑪家鄉','九如鄉','里港鄉','高樹鄉','鹽埔鄉','長治鄉','麟洛鄉','竹田鄉','內埔鄉','萬丹鄉','潮州鎮','泰武鄉','來義鄉','萬巒鄉','崁頂鄉','新埤鄉','南州鄉','林邊鄉','東港鎮','琉球鄉','佳冬鄉','新園鄉','枋寮鄉','枋山鄉','春日鄉','獅子鄉','車城鄉','牡丹鄉','恆春鎮','滿洲鄉',],
    },
    {
      id: 19,
      name: '台東縣',
      districts: ['台東市','綠島鄉','蘭嶼鄉','延平鄉','卑南鄉','鹿野鄉','關山鎮','海端鄉','池上鄉','東河鄉','成功鎮','長濱鄉','太麻里鄉','金峰鄉','大武鄉','達仁鄉',],
    },
    {
      id: 20,
      name: '花蓮縣',
      districts: ['花蓮市','新城鄉','秀林鄉','吉安鄉','壽豐鄉','鳳林鎮','光復鄉','豐濱鄉','瑞穗鄉','萬榮鄉','玉里鎮','卓溪鄉','富里鄉',],
    },
    {
      id: 21,
      name: '連江縣',
      districts: ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
    },
  ];
  
  
const Datapage = () => {
    const COLORS = ['#A3B1FF', '#626EB2'];
    const [data, setData] = useState([
        { group: '共同生活', value1: '1', value2: '12' },
        { group: '獨立生活', value1: '11', value2: '89' },
      ]);
      const [datatot, setDatatot] = useState([
        { name: '共同生活', value: 400 },
        { name: '獨立生活', value: 300 },
      ]);
      const [cityName, setCityName] = useState('');
      const [onpe, setOpen] = useState(false);
    
      const [selectedCity, setSelectedCity] = useState(null);
      const [selectedDistrict, setSelectedDistrict] = useState(null);
      const [householdData, setHouseholdData] = useState([]);
      const [filteredData, setFilteredData] = useState([]);
    
      const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict(null);
        console.log(selectedCity);
      };
    
      const handleDistrictChange = (event, value) => {
        setSelectedDistrict(value);
        console.log(selectedCity.name + value);
      };
    
      const [age, setAge] = useState('');
      const handleChange = (event) => {
        setAge(event.target.value);
    
        function fetchData(page) {
          return fetch(`https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${event.target.value}?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
              const responseData = data.responseData;
              const uniqueSiteIds = new Set();
              const siteIdTotalMap = new Map();
    
              responseData.forEach((item) => {
                const { site_id, household_ordinary_total, household_single_total, household_ordinary_m, household_single_m, household_ordinary_f, household_single_f } = item;
    
                uniqueSiteIds.add(site_id);
    
                if (siteIdTotalMap.has(site_id)) {
                  const existingTotal = siteIdTotalMap.get(site_id);
                  siteIdTotalMap.set(site_id, {
                    household_ordinary_total: existingTotal.household_ordinary_total + parseInt(household_ordinary_total),
                    household_single_total: existingTotal.household_single_total + parseInt(household_single_total),
                    household_ordinary_m: existingTotal.household_ordinary_m + parseInt(household_ordinary_m),
                    household_single_m: existingTotal.household_single_m + parseInt(household_single_m),
                    household_ordinary_f: existingTotal.household_ordinary_f + parseInt(household_ordinary_f),
                    household_single_f: existingTotal.household_single_f + parseInt(household_single_f),
                  });
                } else {
                  siteIdTotalMap.set(site_id, {
                    household_ordinary_total: parseInt(household_ordinary_total),
                    household_single_total: parseInt(household_single_total),
                    household_ordinary_m: parseInt(household_ordinary_m),
                    household_single_m: parseInt(household_single_m),
                    household_ordinary_f: parseInt(household_ordinary_f),
                    household_single_f: parseInt(household_single_f),
                  });
                }
              });
    
              if (data.page < data.totalPage) {
                return fetchData(page + 1).then((nextPageData) => {
                  nextPageData.uniqueSiteIds.forEach((id) => uniqueSiteIds.add(id));
    
                  nextPageData.siteIdTotalMap.forEach((totals, id) => {
                    if (siteIdTotalMap.has(id)) {
                      const existingTotal = siteIdTotalMap.get(id);
                      siteIdTotalMap.set(id, {
                        household_ordinary_total: existingTotal.household_ordinary_total + totals.household_ordinary_total,
                        household_single_total: existingTotal.household_single_total + totals.household_single_total,
                        household_ordinary_m: existingTotal.household_ordinary_m + totals.household_ordinary_m,
                        household_single_m: existingTotal.household_single_m + totals.household_single_m,
                        household_ordinary_f: existingTotal.household_ordinary_f + totals.household_ordinary_f,
                        household_single_f: existingTotal.household_single_f + totals.household_single_f,
                      });
                    } else {
                      siteIdTotalMap.set(id, totals);
                    }
                  });
    
                  return {
                    uniqueSiteIds,
                    siteIdTotalMap,
                  };
                });
              }
    
              return {
                uniqueSiteIds,
                siteIdTotalMap,
              };
            });
        }
    
        fetchData(1)
          .then((result) => {
            const uniqueSiteIds = Array.from(result.uniqueSiteIds);
            const siteIdTotalMap = result.siteIdTotalMap;
            const data = [];
    
            siteIdTotalMap.forEach((totals, id) => {
              data.push({
                site_id: id,
                totals: totals,
              });
            });
    
            setHouseholdData(data);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      };
    
      useEffect(() => {
        console.log('aaaaaa', filteredData);
        console.log('oaaaaaanc', householdData);
      }, [filteredData, householdData]);
    
      const confirm = () => {
        if (age && selectedCity && selectedDistrict) {
          const confirmDataCity = selectedCity.name + selectedDistrict;
          console.log(confirmDataCity);
          const filtered = householdData.filter((item) => item.site_id === confirmDataCity);
          console.log('filtered0', filtered[0].totals.household_ordinary_f);
          console.log('filtered', filtered);
          setData([
            { group: '共同生活', 男性: filtered[0].totals.household_ordinary_f, 女性: filtered[0].totals.household_ordinary_m },
            { group: '獨立生活', 男性: filtered[0].totals.household_single_f, 女性: filtered[0].totals.household_single_m },
          ]);
          setDatatot([
            { name: '共同生活', value: filtered[0].totals.household_ordinary_total },
            { name: '獨立生活', value: filtered[0].totals.household_single_total },
          ]);
          var getTotal = parseInt(filtered[0].totals.household_ordinary_total) + parseInt(filtered[0].totals.household_single_total);
          console.log('datatot', datatot);
          setOpen(true);
          setCityName(confirmDataCity);
        } else {
          alert('請檢查年份, 縣/市, 區是否輸入完整');
        }
        setSelectedDistrict(null);
        setSelectedCity(null);
      };
    
      const getTotal = (data) => {
        return data.reduce((sum, entry) => sum + entry.value, 0);
      };
    
      useEffect(() => {
        console.log('awwwwa', filteredData);
        console.log('onwwwc', householdData);
      }, [filteredData]);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: '48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px 10px 16px',
        backgroundColor: '#651FFF',
      }}
    >
      <Typography
        sx={{
          padding: '10px',
          width: '46px',
          height: '18px',
          fontFamily: 'Ubuntu',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '18px',
          letterSpacing: '0em',
          textAlign: 'left',
          color: '#FFFFFF',
        }}
      >
        LOGO
      </Typography>
      <SettingsOutlinedIcon
        sx={{
          color: '#ffffff',
          border: '1px #FFFFFF4D solid',
          borderRadius: '8px',
          padding: '7px',
        }}
      />
    </Box>

    <Box sx={{ width: '100%', display: 'flex' }}>
      <Box
        sx={{
          width: '10%',
          '@media (max-width: 600px)': {
            width: '0%',
          },
        }}
      >
        <Typography
          sx={{
            position: 'fixed',
            fontSize: '200px',
            lineHeight: '0.75',
            backgroundImage:
              'linear-gradient(180deg, #E60000 0.07%, #FFCC00 30.94%, #007F00 65.61%, #0000CC 99.94%)',
            backgroundClip: 'text',
            color: 'transparent',
            writingMode: 'vertical-lr',
            '@media (max-width: 600px)': {
              opacity: 0.2,
            },
          }}
        >
          TAIWAN
        </Typography>
      </Box>
      <Box
        sx={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '@media (max-width: 600px)': {
            width: '100%',
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '32px',
              '@media (max-width: 600px)': {
                fontSize: '24px',
              },
            }}
          >
            人口數、戶數按戶別及性別統計
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            paddingTop: '30px',
            justifyContent: 'space-between',
            gap: '10px',
            '@media (max-width: 600px)': {
              display: 'contents',
            },
          }}
        >
          <Box
            sx={{
              '@media (max-width: 600px)': {
                padding: '10px',
                width: '90%',
              },
            }}
          >
            <FormControl fullWidth sx={{ width: '74px' }}>
              <InputLabel id="demo-simple-select-label">年份</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={109}>109</MenuItem>
                <MenuItem value={110}>110</MenuItem>
                <MenuItem value={111}>111</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              '@media (max-width: 600px)': {
                padding: '10px',
                width: '90%',
              },
            }}
          >
            <FormControl fullWidth sx={{ width: '165px', '@media (max-width: 600px)': { width: '100%' } }}>
              <InputLabel id="city-label">縣/市</InputLabel>
              <Select
                labelId="city-label"
                id="city-select"
                value={selectedCity}
                label="縣/市"
                onChange={handleCityChange}
              >
                {taiwanCities.map((city) => (
                  <MenuItem key={city.id} value={city}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              '@media (max-width: 600px)': {
                padding: '10px',
                width: '90%',
              },
            }}
          >
            <FormControl
              fullWidth
              sx={{ width: '165px', '@media (max-width: 600px)': { width: '100%' } }}
            >
              <Autocomplete
                id="district-autocomplete"
                options={selectedCity ? selectedCity.districts : []}
                value={selectedDistrict}
                onChange={handleDistrictChange}
                renderInput={(params) => <TextField {...params} label="區" />}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              '@media (max-width: 600px)': {
                padding: '10px',
                width: '90%',
              },
            }}
          >
            <Button
              variant="contained"
              onClick={confirm}
              sx={{
                width: '83px',
                height: '55px',
                '@media (max-width: 600px)': {
                  width: '100%',
                },
              }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', display: 'flex', width: '100%', paddingTop: '30px' }}>
          <hr
            style={{ width: '40%', height: '1px', marginTop: '18px', borderTop: '1px solid #B388FF' }}
          />
          <Typography
            sx={{
              display: 'inline-block',
              padding: '5px 10px',
              border: '1px solid #B388FF',
              borderRadius: '50px',
              color: '#B388FF',
              '@media (max-width: 600px)': {
                fontSize: '8px',
              },
            }}
          >
            搜尋結果
          </Typography>
          <hr
            style={{ width: '40%', height: '1px', marginTop: '18px', borderTop: '1px solid #B388FF' }}
          />
        </Box>
        {onpe && (
          <>
            <Box>
              <Typography sx={{ display: 'inline-block', padding: '5px 10px', fontSize: '32px' }}>
                {cityName ? (
                  <>
                    {age}年 {cityName}
                  </>
                ) : (
                  <></>
                )}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ display: 'inline-block', padding: '5px 10px' }}>
                人口戶數及性別
              </Typography>
            </Box>
            <Box>
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="男性" fill="#7D5FB2" />
                <Bar dataKey="女性" fill="#C29FFF" />
                {/* Add more <Bar> components for additional data groups */}
              </BarChart>
            </Box>
            <Box>
              <PieChart width={500} height={500}>
                <Pie
                  data={datatot}
                  cx={210}
                  cy={200}
                  innerRadius={0}
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {datatot.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
          </>
        )}
        {!onpe && (
          <Box>
            <Typography
              sx={{
                display: 'inline-block',
                padding: '5px 10px',
                fontSize: '32px',
              }}
            >
              
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  </Box>
  )
};

export default Datapage;