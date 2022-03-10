from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import time

chrome = webdriver.ChromeOptions()
chrome.add_argument('--headless')
chrome.add_argument('--log-level=3')

list_timestamp_delta = []

i = 0
while i < 100:
    try:
        driver = webdriver.Chrome('C:/Users/Louis/Downloads/chromedriver_win32_99/chromedriver.exe', options=chrome)
        driver.get("https://my-react-ms-auth.placesm-portfolio.fr/")

        button = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.ID, "redirect")))
        
        button.click()
        
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "email")))
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "password")))
        WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.ID, "next")))
        
        timestamp_start = time()

        email = driver.find_element_by_id("email").send_keys("maxime.places@gmail.com")
        password = driver.find_element_by_id("password").send_keys("Azqazq123*")
        submit = driver.find_element_by_id("next").click()

        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "connected")))
        
        timestamp_end = time()
        timestamp_delta = int((timestamp_end - timestamp_start)*1000)
        
        list_timestamp_delta.append(timestamp_delta)

        print(f"Connected in {timestamp_delta} milliseconds for {i}")
        i += 1
    except Exception as e:
        print(f"Not connected for {i} because : {e}")
    
    driver.quit()

    
print(f"Len of list_timestamp_delta = {len(list_timestamp_delta)}, expect 100.")

print(f"List of timestamp_delta : {list_timestamp_delta}")

average_timestamp_delta = sum(list_timestamp_delta)/100
print(f"Average timestamp_delta = {average_timestamp_delta}")