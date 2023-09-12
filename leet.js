const removeDuplicates = (nums) => {
    let k = 0;
    const freq = {}
    for (let i = 0; i < nums.length; i++){
        let j = i;
        while (freq[nums[j]] !== undefined && j < nums.length-1){
            j++;
           
        }
        nums[i] = nums[j];

          
        freq[nums[i]] = (freq[nums[i]] || 0) +  1;
        if(freq[nums[i]] === 1){
            k++;
        }
    }
    return k;
}

const nums = [1, 1, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 11];
removeDuplicates(nums);